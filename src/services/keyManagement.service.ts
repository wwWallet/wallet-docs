import { Err, Ok, Result } from "ts-results";
import { RegisterUserErrors, FetchUserErrors } from "../types/errors/user.errors";
import { userRepository } from "../repositories/user.repository";
import { createNaturalPersonWallet, NaturalPersonWalletI } from '@gunet/ssi-pack';
import fs from 'fs';
import path from "path";
import crypto from 'crypto';
import { importJWK, SignJWT } from "jose";



class KeyManagementService {

	// map DID to a NaturalPersonWalletI json object
	private registeredKeys = new Map<string, NaturalPersonWalletI>();
	private didQueue: string[] = [];
	private maxQueueSize = 1000;

	constructor() {
		// load keys from keys/ directory to registeredKeys map
		const keysDirectory = path.join(__dirname, '../../../keys');
		try {
			fs.mkdirSync(keysDirectory);
		}
		catch(e) {
			if ((e as any).code === 'EEXIST')
				console.log("[-] Directory alread exists");
			else {
				throw new Error("[-] Application did not have the correct permissions to create keys directory");
			}
		}
		fs.readdir(keysDirectory, (err, files: string[]) => {
			if (err) {
				console.log('[-] Unable to scan directory: ', err);
				return;
			}

			for (const filename of files) {
				// dont exceed the max queue size
				if (this.didQueue.length > this.maxQueueSize)
					break;
				const keyFilepath = path.join(keysDirectory, filename);
				const fileContaints: string = fs.readFileSync(keyFilepath, 'utf-8');
				const did = filename.split('.')[0];
				const keys = JSON.parse(fileContaints);
				this.registeredKeys.set(did, keys);
				this.didQueue.push(did);
			}
		});
	}

	// will be used to set the {key: did, value: Wallet} back on the map and return it.
	private updateQueue(did: string): NaturalPersonWalletI {

		const keysDirectory = path.join(__dirname, '../../../keys');
		const filename = did + '.keys';

		const mapResult = this.registeredKeys.get(did);
		// if found on map, return it
		if (mapResult != undefined)
			return mapResult;

		// if cannot be added, then remove a Wallet from the queue & map
		if (this.didQueue.length >= this.maxQueueSize) {
			// remove from queue
			const deletedDID = this.didQueue.pop();
			// remove from map
			if (deletedDID != undefined)
				this.registeredKeys.delete(deletedDID);
		}
		// add the new did keys from the filesystem to the queue & queue
		const keyFilepath = path.join(keysDirectory, filename);
		const fileContaints: string = fs.readFileSync(keyFilepath, 'utf-8');
		const keys = JSON.parse(fileContaints);
		this.registeredKeys.set(did, keys);
		this.didQueue.push(did);
		return keys;
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

		const naturalPersonWallet: NaturalPersonWalletI = await createNaturalPersonWallet();

		// queue management
		const keysStringified = JSON.stringify(naturalPersonWallet);
		const newKeyPath = path.join(__dirname, '../../../keys', `${naturalPersonWallet.did}.keys`);
		try {
			fs.writeFileSync(newKeyPath, keysStringified);
			this.updateQueue(naturalPersonWallet.did);
		}
		catch (e) {
			console.log('[-] Unable to store the keys on the filesystem');
			return Err('FILESYSTEM_ERROR');
		}


		const passwordHash = crypto.createHash('sha256').update(password).digest('base64');
		const result = await userRepository.createUser(naturalPersonWallet.did, passwordHash);
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
		const userResult = await userRepository.fetchUser(did, passwordInputHash);
		if (!userResult.ok) {
			return Err(userResult.val);
		}
		return Ok(null);
	}



	async createVP(holderDID: string, vcIdentifiersList: string[]): Promise<Result<null, null>> {

		const wallet: NaturalPersonWalletI = this.updateQueue(holderDID);
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
		issuerDID: string): Promise<{encryptedProof: string}> {

		const wallet: NaturalPersonWalletI = this.updateQueue(holderDID);
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
		return { encryptedProof: encryptedProof };
	}

}

const keyManagementService = new KeyManagementService();
export default keyManagementService;