import express, { Router, Request, Response } from 'express';
import userService from '../services/user.service';
import { CreateUserRequestDTO, CreateUserResponseDTO } from '../dto/user.dto';



/**
 * "/user"
 */
const userController = express.Router();



userController.post('/create', async (req: Request, res: Response) => {
	const body: CreateUserRequestDTO = req.body;
	await userService.createUser(body.email);
	res.send({k: "any"} as CreateUserResponseDTO);
});

export default userController;