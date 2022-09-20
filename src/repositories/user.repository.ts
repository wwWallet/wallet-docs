import { Err, Ok, Result } from "ts-results";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../AppDataSource";
import { User } from "../entities/user.entity";


class UserRepository {
	private repo: Repository<User>;

	constructor(dataSource: DataSource) {
		this.repo = dataSource.getRepository(User);
		console.log("User repository has just been created");
	}

	async createUser(email: string): Promise<Result<null, "ALREADY_EXISTS">> {
		const user = {email: email};
		try {
			await this.repo.insert(user);
			return Ok(null)
		}
		catch(e) {
			console.log(e);
			return Err("ALREADY_EXISTS");
		}
	}

}

const userRepository = new UserRepository(AppDataSource);
export { UserRepository, userRepository };