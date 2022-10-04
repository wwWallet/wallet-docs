import express, { Request, Response, Router } from 'express';
import { LoginUserRequestDTO, RegisterRequestDTO } from '../dto/user.dto';
import {SignJWT} from 'jose';
import config from '../../config/config.dev';
import userService from '../services/user.service';

/**
 * "/user"
 */
const userController: Router = express.Router();

userController.post('/register', async (req: Request, res: Response) => {
	const body: RegisterRequestDTO = req.body;
	if (body.password == undefined) {
		console.log("[-] WalletRegistration: Missing password")
		res.status(401).send({ err: "MISSING_PASSWORD" });
		return;
	}
	
	const registerUserResult = await userService.registerUser(body.password);
	if (!registerUserResult.ok) {
		res.status(400).send({err: registerUserResult.val});
		return;
	}
	const { did, appToken } = registerUserResult.val;
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
		res.status(400).send({err: loginUserResult.val});
		return;
	}
	const { appToken } = loginUserResult.val;

	res.send({appToken});
});
export default userController;