import { Err, Ok, Result } from "ts-results";
import { Vc } from "../entities/vc.entity";
import { vcRepository } from "../repositories/vc.repository";
import { GetAllVcByDidErrors, GetVcErrors, StoreVcErrors } from "../types/errors/storage.errors";


class StorageService {


	constructor() { }

	// Store a VC in the db
	async storeVC(holderDID: string, vcjwt: string): Promise<Result<null, StoreVcErrors>> {

		// get from inside vc
		const vcIdentifier: string = "vcid";

		const createVcRes = await vcRepository.createVc(vcIdentifier, holderDID, vcjwt);

		if(createVcRes.ok) {
			return Ok(null);
		}
		else {
			return Err(createVcRes.val);
		}

	}

	// Get all VCs of a holder with a specific DID
	async getAllVCs(holderDID: string): Promise<Result<Vc[], GetAllVcByDidErrors>> {

		const getAllVCsRes = await vcRepository.getAllVcsByDid(holderDID);

		if(getAllVCsRes.ok) {
			return Ok(getAllVCsRes.val);
		}
		else {
			console.log(getAllVCsRes.err);
			return Err(getAllVCsRes.val);
		}
	}

	async getVC(holderDID: string, vcIdentifier: string): Promise<Result<Vc, GetVcErrors>> {

		const getVCRes = await vcRepository.getVcById(holderDID, vcIdentifier);

		if(getVCRes.ok) {
			return Ok(getVCRes.val);
		}
		else {
			console.log(getVCRes.err);
			return Err(getVCRes.val);
		}

	}

}

const storageService = new StorageService();
export default storageService;