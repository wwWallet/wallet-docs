import { Err, Ok, Result } from "ts-results";
import { CreateUserErrors, GetUsersErrors } from "../types/errors/user.errors";
import { userRepository } from "../repositories/user.repository";


class UserService {
	constructor() {

	}

	async createUser(
			email: string
	): Promise<Result<null, CreateUserErrors>> {

		const result = await userRepository.createUser(email);
		if (result.ok)
			return Ok(null);
		else
			return Err(result.val);
	}

}

const userService = new UserService();
export default userService;