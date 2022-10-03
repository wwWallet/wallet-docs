import express, { Request, Response, Router } from 'express';
import { LoginUserRequestDTO, LoginUserResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from '../dto/user.dto';
import userService from '../services/keyManagement.service';
import {SignJWT} from 'jose';
import config from '../../config/config.dev';

/**
 * "/user"
 */
const userController: Router = express.Router();

userController.post('/register', async (req: Request, res: Response) => {
	const body: RegisterRequestDTO = req.body;
	if (body.password == undefined) {
		console.log("[-] Missing password")
		res.status(401).send("Missing password from body");
		return;
	}
	const registerUserResult = await userService.registerUser(body.password);
	if (!registerUserResult.ok) {
		res.status(400).send({error: registerUserResult.val});
		return;
	}
	
	const { did } = registerUserResult.val;

	const payload = {
		did: did
	};

	const secret = new TextEncoder().encode(config.appSecret);
  const appToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.appTokenExpiration)
    .sign(secret);

	
	res.send({did: did, appToken: appToken});
});

userController.post('/login', async (req: Request, res: Response) => {

	const body: LoginUserRequestDTO = req.body;
	if (body.did == undefined || body.password == undefined) {
		res.status(401).send({error: "DID or password is missing from body"});
		return;
	}
	const loginUserResult = await userService.loginUser(body.did, body.password);
	if (!loginUserResult.ok) {
		res.status(400).send({error: loginUserResult.val});
		return;
	}

	const secret = new TextEncoder().encode(config.appSecret);
  const appToken = await new SignJWT({did: body.did})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.appTokenExpiration)
    .sign(secret);

	res.send({appToken});
});
export default userController;