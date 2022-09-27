import { Err, Ok, Result } from "ts-results";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../AppDataSource";
import { Vp } from "../entities/vp.entity";
import { GetAllVpByDidErrors, GetAllVpByIssErrors, GetVpErrors, StoreVpErrors } from "../types/errors/storage.errors";

class VpRepository {
	private repo: Repository<Vp>;

	constructor(dataSource: DataSource) {
		this.repo = dataSource.getRepository(Vp);
		console.log("VP repository has just been created");
	}

	// Insert given VP to repository
	async createVp(vpjwt: string, holderDID: string, vpIdentifier: string,
		issuerDID: string, audienceDID: string): Promise<Result<null, StoreVpErrors>> {

		const vpRecord = {vpIdentifier: vpIdentifier, jwt: vpjwt,
			issuerDID: issuerDID, holderDID: holderDID, audienceDID: audienceDID}
		
		try {
			await this.repo.insert(vpRecord);
			return Ok(null);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	// Get All VPs belonging to a holder with given DID
	async getAllVpsByDid(holderDID: string): Promise<Result<Vp[], GetAllVpByDidErrors>> {

		try {
			const vps = await this.repo.find({
				where: {
					holderDID: holderDID
				}
			});
			return Ok(vps);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	// Get a VP with a given ID, provided it belongs to given holder
	async getVpById(holderDID: string, vpIdentifier: string): Promise<Result<Vp, GetVpErrors>> {

		try {
			const vp = await this.repo.findOneBy({
				holderDID: holderDID,
				vpIdentifier: vpIdentifier
			});

			if( vp !== null ) {
				return Ok(vp);
			}
			else {
				return Err('VP_NOT_FOUND_ERROR');
			}
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

	// Get all VPs from a given issuer, provided they belong to given holder
	async getVpsByIssuer(holderDID: string, issuerDID: string): Promise<Result<Vp[], GetAllVpByIssErrors>> {

		try {
			const vps = await this.repo.find({
				where: {
					holderDID: holderDID,
					issuerDID: issuerDID
				}
			});
			return Ok(vps);
		}
		catch(e) {
			console.log(e);
			return Err('DB_ERROR');
		}
	}

}

const vpRepository = new VpRepository(AppDataSource);
export {VpRepository, vpRepository};