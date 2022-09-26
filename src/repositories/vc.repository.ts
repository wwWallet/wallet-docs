import { Err, Ok, Result } from "ts-results";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../AppDataSource";
import { Vc } from "../entities/vc.entity";
import { StoreVcErrors } from "../types/errors/user.errors";


class VcRepository {
	private repo: Repository<Vc>;

	constructor(dataSource: DataSource) {
		this.repo = dataSource.getRepository(Vc);
		console.log("Vc repository has just been created");
	}

	async createVc(vcjwt: string): Promise<Result<null, StoreVcErrors>> {
		const vcCredentialRecord = {jwt: vcjwt};
		try {
			await this.repo.insert(vcCredentialRecord);
			return Ok(null);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

}

const vcRepository = new VcRepository(AppDataSource);
export { VcRepository, vcRepository };