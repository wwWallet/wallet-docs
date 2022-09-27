import { Err, Ok, Result } from "ts-results";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../AppDataSource";
import { Vc } from "../entities/vc.entity";
import { GetAllVcByDidErrors, GetAllVcByIssErrors, GetVcErrors, StoreVcErrors } from "../types/errors/storage.errors";


class VcRepository {
	private repo: Repository<Vc>;

	constructor(dataSource: DataSource) {
		this.repo = dataSource.getRepository(Vc);
		console.log("VC repository has just been created");
	}

	// Insert given VC to repository
	async createVc(vcjwt: string, holderDID: string, vcIdentifier: string,
		issuerDID: string): Promise<Result<null, StoreVcErrors>> {
		const vcCredentialRecord = {vcIdentifier: vcIdentifier, jwt: vcjwt,
			holderDID: holderDID, issuerDID: issuerDID};

		try {
			await this.repo.insert(vcCredentialRecord);
			return Ok(null);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	// Get All VCs belonging to a holder with given DID
	async getAllVcsByDid(holderDID: string): Promise<Result<Vc[], GetAllVcByDidErrors>> {

		try {
			const vcs = await this.repo.find({
				where: {
					holderDID: holderDID
				}
			});
			return Ok(vcs);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	// Get a VC with a given ID, provided it belongs to given holder
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

	// Get all VCs from a given issuer, provided they belong to given holder
	async getVcsByIssuer(holderDID: string, issuerDID: string): Promise<Result<Vc[], GetAllVcByIssErrors>> {

		try {
			const vcs = await this.repo.find({
				where: {
					holderDID: holderDID,
					issuerDID: issuerDID
				}
			});
			return Ok(vcs);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

}

const vcRepository = new VcRepository(AppDataSource);
export { VcRepository, vcRepository };