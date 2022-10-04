import { Err, Ok, Result } from "ts-results";
import { FetchUserErrors, RegisterUserErrors } from "../types/errors/user.errors";
import crypto from 'node:crypto';
import { userRepository } from "../repositories/user.repository";
import axios from "axios";
import config from "../../config/config.dev";
import { SignJWT } from "jose";

class UserService {
	constructor() { }

	/**
	 * 
	 * @param password
	 * @returns
	 * On success, returns the DID of the user.
	 */
	async registerUser(
		password: string
	): Promise<Result<{did: string, appToken: string}, RegisterUserErrors>> {

		const secret = new TextEncoder().encode(config.appSecret);
		// Step 1. Ask Signatory node to generate a DID

		// the following token will be used as an authentication mechanism Signatory Node to generate a DID for us.
		const generateDIDOneTimeToken = await new SignJWT({ type: "generate_did" })
			.setExpirationTime('1min')
			.setProtectedHeader({ alg: 'HS256' })
			.setAudience(config.signatoryNode.url)
			.setIssuer(config.url)
			.setIssuedAt()
			.sign(secret);

		const generateDDIDResponse = await axios.get(config.signatoryNode.url + '/user/register', {
			headers: {
				"Authorization": "Bearer " + generateDIDOneTimeToken
			}
		});


		// Step 2. Store user(did, passwordHash) on database
		const { did } = generateDDIDResponse.data as { did: string };
		const passwordHash = crypto.createHash('sha256').update(password).digest('base64');
		const result = await userRepository.createUser(did, passwordHash);


		// Step 3. Issue an app token for user authentication with StoreNodes and the SignatoryNode
		const payload = {
			did: did
		};
		const appToken = await new SignJWT(payload)
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setIssuer("urn:StoreNode")
			.setExpirationTime(config.appTokenExpiration)
			.sign(secret);

		if (result.ok)
			return Ok({ did, appToken });
		else
			return Err(result.val);
	}

	async loginUser(
		did: string,
		password: string
	): Promise<Result<{appToken: string}, FetchUserErrors>> {
		
		const passwordInputHash = crypto.createHash('sha256').update(password).digest('base64');
		const userResult = await userRepository.getUserByHash(did, passwordInputHash);

		if (!userResult.ok) {
			return Err(userResult.val);
		}
		const secret = new TextEncoder().encode(config.appSecret);
		const appToken = await new SignJWT({did: did})
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setIssuer("urn:StoreNode")
			.setExpirationTime(config.appTokenExpiration)
			.sign(secret);
		return Ok({ appToken });
	}
}

const userService: UserService = new UserService();
export default userService;