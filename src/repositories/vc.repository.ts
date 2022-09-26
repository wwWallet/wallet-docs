import { Err, Ok, Result } from "ts-results";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../AppDataSource";
import { Vc } from "../entities/vc.entity";
import { GetAllVcByDidErrors, GetVcErrors, StoreVcErrors } from "../types/errors/storage.errors";


class VcRepository {
	private repo: Repository<Vc>;

	constructor(dataSource: DataSource) {
		this.repo = dataSource.getRepository(Vc);
		console.log("Vc repository has just been created");
	}

	async createVc(vcIdentifier: string, vcjwt: string, holderDID: string): Promise<Result<null, StoreVcErrors>> {
		const vcCredentialRecord = {vcIdentifier: vcIdentifier, jwt: vcjwt, holderDID: holderDID};
		try {
			await this.repo.insert(vcCredentialRecord);
			return Ok(null);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	async getAllVcsByDid(holderDID: string): Promise<Result<Vc[], GetAllVcByDidErrors>> {

		try {
			const vcs = await this.repo.find({
				where: {
					holderDID: holderDID
				}
			});

			console.log(vcs);
			return Ok(vcs);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	async getVcById(holderDID: string, vcIdentifier: string): Promise<Result<Vc, GetVcErrors>> {

		try {
			const vc = await this.repo.findOneBy({
				holderDID: holderDID,
				vcIdentifier: vcIdentifier
			});

			if(vc !== null) {
				return Ok(vc);
			}
			else {
				return Err('VC_NOT_FOUND_ERROR')
			}
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

}

const vcRepository = new VcRepository(AppDataSource);
export { VcRepository, vcRepository };