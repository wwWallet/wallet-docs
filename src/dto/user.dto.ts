
// the format of a request from the frontend
export interface CreateUserRequestDTO {
	email: string;
}

// what is the response our controller will return
export interface CreateUserResponseDTO {
	error?: string;
}