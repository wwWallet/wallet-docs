import { base64url } from "jose";
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
	async createVc(vcjwt: string,
		holderDID: string,
		vcIdentifier: string,
		issuerDID: string,
		vcType: string,
		issuerInstitution: string): Promise<Result<null, StoreVcErrors>> {
		
		const vcCredentialRecord = {
			identifier: vcIdentifier,
			jwt: vcjwt,
			holderDID: holderDID,
			issuerDID: issuerDID,
			issuerInstitution: issuerInstitution,
			type: vcType 
		} as Vc;

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
	async getAllVcsByDid(holderDID: string): Promise<Result<Partial<Vc>[], GetAllVcByDidErrors>> {

		try {
			const vcJwtList: Partial<Vc>[] = await this.repo
				.createQueryBuilder("vc")
				.where("vc.holderDID = :did", {did: holderDID})
				.getMany();
			for (const vc of vcJwtList) {
				if (vc.jwt != undefined)
					vc.jwt = vc.jwt.toString();
			}
			return Ok(vcJwtList);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	// Get a VC with a given ID, provided it belongs to given holder
	async getVcById(holderDID: string, vcIdentifier: string): Promise<Result<Partial<Vc>, GetVcErrors>> {
		try {
			const vc: Partial<Vc> | null = await this.repo
				.createQueryBuilder("vc")
				.where("vc.holderDID = :did and vc.identifier = :vcId", {did: holderDID, vcId: vcIdentifier})
				.getOne();
			if(vc !== null) {

				if (vc.jwt != undefined) {
					vc.jwt = vc.jwt.toString();
				}
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
			for (const vc of vcs) {
				if (vc.jwt != undefined)
					vc.jwt = vc.jwt.toString();
			}
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