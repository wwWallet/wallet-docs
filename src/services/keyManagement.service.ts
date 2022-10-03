import { Err, Ok, Result } from "ts-results";
import { RegisterUserErrors, FetchUserErrors } from "../types/errors/user.errors";
import { userRepository } from "../repositories/user.repository";
import { createNaturalPersonWallet, NaturalPersonWalletI } from '@gunet/ssi-pack';
import fs from 'fs';
import path from "path";
import crypto from 'crypto';
import { importJWK, SignJWT } from "jose";
import { User } from "../entities/user.entity";



class KeyManagementService {

	// map DID to a NaturalPersonWalletI json object
	private registeredKeys = new Map<string, NaturalPersonWalletI>();
	private didQueue: string[] = [];
	private maxQueueSize = 1000;

	constructor() { }

	// will be used to set the {key: did, value: Wallet} back on the map and return it.
	private async updateQueue(did: string): Promise<Result<NaturalPersonWalletI, FetchUserErrors | "KEYS_NOT_FOUND">> {
		const mapResult = this.registeredKeys.get(did);
		// if found on map, return it
		if (mapResult != undefined)
			return Ok(mapResult);

		// if cannot be added, then remove a Wallet from the queue & map
		if (this.didQueue.length >= this.maxQueueSize) {
			// remove from queue
			const deletedDID = this.didQueue.pop();
			// remove from map
			if (deletedDID != undefined)
				this.registeredKeys.delete(deletedDID);
		}
		// add the new did keys from the filesystem to the queue & queue
		const result = await userRepository.getUserKeysByDid(did);
		if (!result.ok) {
			return Err(result.val);
		}
		const user = result.val;
		if (user.keys == undefined)
			return Err("KEYS_NOT_FOUND");
		const keys = JSON.parse(user.keys) as NaturalPersonWalletI;
		this.registeredKeys.set(did, keys);
		this.didQueue.push(did);
		return Ok(keys);
	}

	/**
	 * 
	 * @param password
	 * @returns
	 * On success, returns the DID of the user.
	 */
	async registerUser(
		password: string
	): Promise<Result<{did: string}, RegisterUserErrors>> {

		const naturalPersonWallet: NaturalPersonWalletI = await createNaturalPersonWallet('ES256K');

		// queue management
		const keysStringified = JSON.stringify(naturalPersonWallet);

		const passwordHash = crypto.createHash('sha256').update(password).digest('base64');
		const result = await userRepository.createUser(naturalPersonWallet.did, passwordHash, keysStringified);
		if (result.ok)
			return Ok({did: naturalPersonWallet.did});
		else
			return Err(result.val);
	}

	async loginUser(
		did: string,
		password: string
	): Promise<Result<null, FetchUserErrors>> {
		
		// not needed
		// this.updateQueue(did);

		const passwordInputHash = crypto.createHash('sha256').update(password).digest('base64');
		const userResult = await userRepository.getUserByHash(did, passwordInputHash);
		if (!userResult.ok) {
			return Err(userResult.val);
		}
		return Ok(null);
	}



	async createVP(holderDID: string, vcIdentifiersList: string[]): Promise<Result<null, null>> {

		const result = await this.updateQueue(holderDID);
		if (!result.ok)
			return Err(null);
		return Ok(null);
	}

	async verifyVC(vcjwt: string): Promise<Result<null, null>> {
		return Ok(null);
	}

	async verifyVP(vpjwt: string): Promise<Result<null, null>> {
		return Ok(null);
	}


	/**
	 * 
	 * @param holderDID 
	 * @param tempRsaPublicKey // sent by the Wallet client
	 * @param c_nonce // sent from the Token response -> Wallet client
	 * @param issuerDID
	 * @returns 
	 * On the "Token Response" phase of the Credential issuance, the Wallet client receives a c_nonce
	 * from the Issuer.
	 * On the "Credential Request" phace of the Credential issuance (which is the next step), the
	 * Wallet client must construct a proof based on the c_nonce to prove DID key ownership.
	 * 
	 * Since the backend has the keys of the wallet client, the Wallet client must send the c_nonce,
	 * the wallet backend will construct a proof, encrypt it and then send it to the wallet client.
	 */
	async constructProof(
		holderDID: string,
		tempRsaPublicKey: string,
		c_nonce: string,
		issuerDID: string): Promise<Result<{encryptedProof: string}, FetchUserErrors | "KEYS_NOT_FOUND">> {

		const result = await this.updateQueue(holderDID);
		if (!result.ok)
			return Err(result.val);
		
		const wallet: NaturalPersonWalletI = result.val;
		const proofBasedOnNonce = await new SignJWT({c_nonce: c_nonce})
			.setIssuedAt()
			.setSubject(wallet.did)
			.setAudience(issuerDID)
			.setProtectedHeader({alg: 'ES256K'})
			.sign(await importJWK(wallet.privateKeyJwk, 'ES256K'));
		const encryptedProof = crypto.publicEncrypt(
			{
				key: tempRsaPublicKey,
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
				oaepHash: "sha256",
			},
			// We convert the data string to a buffer using `Buffer.from`
			Buffer.from(proofBasedOnNonce)
		).toString('base64');
		console.log("Encrypted proof")
		// const buffer = Buffer.from(encryptedProof, 'utf-8');
		console.log("Buffer base64 = ", encryptedProof)
		return Ok({ encryptedProof: encryptedProof });
	}

}

const keyManagementService = new KeyManagementService();
export default keyManagementService;