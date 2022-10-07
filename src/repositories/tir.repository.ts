import { Err, Ok, Result } from "ts-results";
import { DataSource, Like, Repository } from "typeorm";
import AppDataSource from "../AppDataSource";
import { TIR } from "../entities/tir.entity";
import { TIRErrors, ClearTIRErrors, GetIssuerByNameErrors } from "../types/errors/tir.errors";

class TIRRepository {
	private repo: Repository<TIR>;

	constructor(dataSource: DataSource) {
		this.repo = dataSource.getRepository(TIR);
		console.log("TIR repository has just been created");
	}

	// insert an Issuer record in the TIR
	async insertIssuer(did: string, institution: string, country: string, data: string): Promise<Result<null, TIRErrors>> {

		const trustedIssuer = {did: did, institution: institution, country: country, data: data};

		try {
			await this.repo.insert(trustedIssuer);
			return Ok(null);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	// clear Trusted Issuer Registry
	async clearTIR(): Promise<Result<null, ClearTIRErrors>> {
		
		try {
			await this.repo.clear();
			return Ok(null);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	// return Trusted Issuers filtered by Institution Name
	async getIssuersByInstitutionName(institution: string, country: string): Promise<Result<TIR[], GetIssuerByNameErrors>> {

		try {
			const results: TIR[] = await this.repo.find({
				where: {
					institution: Like(`%${institution}%`),
					country: Like(`%${country}%`)
				}
			});
			return Ok(results);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

}

const tirRepository = new TIRRepository(AppDataSource);
export { TIRRepository, tirRepository };