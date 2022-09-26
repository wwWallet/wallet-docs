import { Err, Ok, Result } from "ts-results";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../AppDataSource";
import { User } from "../entities/user.entity";
import { FetchUserErrors, RegisterUserErrors } from "../types/errors/user.errors";


class UserRepository {
	private repo: Repository<User>;

	constructor(dataSource: DataSource) {
		this.repo = dataSource.getRepository(User);
		console.log("User repository has just been created");
	}

	async createUser(
		did: string,
		passwordHash: string): Promise<Result<null, "ALREADY_EXISTS">> {

		const user = {
			did: did,
			passwordHash: passwordHash
		};
		try {
			await this.repo.insert(user);
			return Ok(null);
		}
		catch(e) {
			console.log(e);
			return Err("ALREADY_EXISTS");
		}
	}

	async fetchUser(
		did: string,
		passwordHash: string
	): Promise<Result<User, FetchUserErrors>> {

		try {
			const user = await this.repo.findOne({where: {did: did, passwordHash: passwordHash}});
			if (user == null)
				return Err("NOT_FOUND");
			return Ok(user);
		}
		catch(e) {
			console.log(e);
			return Err("DB_ERROR");
		}
	}

}

const userRepository = new UserRepository(AppDataSource);
export { UserRepository, userRepository };