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
		username: string,
		did: string,
		passwordHash: string): Promise<Result<null, "ALREADY_EXISTS">> {

		const user = {
			username: username,
			did: did,
			passwordHash: passwordHash,
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

	async getAllUsersKeys(limit?: number): Promise<Result<Partial<User>[], FetchUserErrors>> {
		try {
			let users: User[];
			if (limit != undefined)
				users = await this.repo.createQueryBuilder("User")
					.select("did", "keys")
					.limit(limit)
					.getMany();
			else
				users = await this.repo.createQueryBuilder("User")
					.select("did", "keys")
					.getMany();
			return Ok(users);
		}	
		catch(e) {
			console.log(e);
			return Err("DB_ERROR");
		}
	}

	async getUserByUsernameAndHash(
		username: string,
		passwordHash: string
	): Promise<Result<User, FetchUserErrors>> {

		try {
			const user = await this.repo.findOne({where: {username: username, passwordHash: passwordHash}});
			if (user == null)
				return Err("NOT_FOUND");
			return Ok(user);
		}
		catch(e) {
			console.log(e);
			return Err("DB_ERROR");
		}
	}

	async getUserKeysByDid(
		did: string
	): Promise<Result<Partial<User>, FetchUserErrors>> {
		try {
			const user: Partial<User> | null  = await this.repo.createQueryBuilder()
				.from(User, "user")
				.select("keys")
				.where("user.did = :did", { did: did })
				.getOne();
			if (user == null)
				return Err("NOT_FOUND")
			return Ok(user);
		}
		catch(e) {
			console.log(e);
			return Err("DB_ERROR");
		}
	}

	async userExists(
		username: string,
	): Promise<Result<boolean, "DB_ERROR">> {
		try {
			const user = await this.repo.findOne({where: {username: username}});
			if (user == null)
				return Ok(false);
			return Ok(true);
		}
		catch(e) {
			console.log(e);
			return Err("DB_ERROR");
		}
	}
}

const userRepository = new UserRepository(AppDataSource);
export { UserRepository, userRepository };