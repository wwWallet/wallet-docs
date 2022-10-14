import { FetchUserErrors, RegisterUserErrors } from "../types/errors/user.errors";

// the format of a request from the frontend

// Register User
export type RegisterRequestDTO = {
	username: string;
	password: string;
	repeatpw: string;
}

// what is the response our controller will return
export type RegisterResponseDTO = {
	did: string;
	error?: RegisterUserErrors;
}


// Login User

export type LoginUserRequestDTO = {
	username: string;
	password: string;
}

export type LoginUserResponseDTO = {
	error?: FetchUserErrors
}