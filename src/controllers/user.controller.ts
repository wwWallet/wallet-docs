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
	if (body.username == undefined) {
		console.log("[-] WalletRegistration: Missing username")
		res.status(401).send({ err: "MISSING_USERNAME" });
		return;
	}
	if (body.password == undefined) {
		console.log("[-] WalletRegistration: Missing password")
		res.status(401).send({ err: "MISSING_PASSWORD" });
		return;
	}
	if (body.repeatpw == undefined) {
		console.log("[-] WalletRegistration: Missing repeat password")
		res.status(401).send({ err: "MISSING_REPEAT_PASSWORD" });
		return;
	}
	if (body.password !== body.repeatpw) {
		console.log("[-] WalletRegistration: Passwords do not match")
		res.status(401).send({ err: "PASSWORDS_NOT_MATCHING" });
		return;
	}

	const userExistsResult = await userService.checkIfUserExists(body.username);
	if (!userExistsResult.ok) {
		res.status(400).send({err: userExistsResult.val});
		return;
	}
	if (userExistsResult.val) {
		console.log("[-] WalletRegistration: Username already exists")
		res.status(401).send({ err: "USERNAME_ALREADY_EXISTS" });
		return;
	}
	
	const registerUserResult = await userService.registerUser(body.username, body.password);
	if (!registerUserResult.ok) {
		res.status(400).send({err: registerUserResult.val});
		return;
	}
	const { did, appToken } = registerUserResult.val;
	res.send({did: did, appToken: appToken});
});

userController.post('/login', async (req: Request, res: Response) => {
	const body: LoginUserRequestDTO = req.body;
	if (body.username == undefined) {
		console.log("[-] WalletLogin: Missing username");
		res.status(401).send({ err: "MISSING_USERNAME" });
		return;
	}
	if (body.password == undefined) {
		console.log("[-] WalletLogin: Missing password");
		res.status(401).send({ err: "MISSING_PASSWORD" });
		return;
	}

	const loginUserResult = await userService.loginUser(body.username, body.password);
	if (!loginUserResult.ok) {
		if(loginUserResult.val === "NOT_FOUND") {
			console.log("[-] WalletLogin: Invalid credentials");
			res.status(401).send({ err: "INVALID_CREDENTIALS" });
			return;
		}
		else {
			res.status(400).send({err: loginUserResult.val});
			return;
		}
	}
	const { appToken } = loginUserResult.val;

	res.send({appToken});
});
export default userController;