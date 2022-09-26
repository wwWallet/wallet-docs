import { Err, Ok, Result } from "ts-results";
import keyManagementService from "./keyManagement.service";


class StorageService {


	constructor() { }


	async storeVC(holderDID: string, vcjwt: string): Promise<Result<null, null>> {
		return Ok(null);
	}

	async getAllVCs(holderDID: string): Promise<Result<null, null>> {
		return Ok(null);
	}

	async getVC(holderDID: string, vcIdentifier: string): Promise<Result<null, null>> {
		return Ok(null);
	}

}

const storageService = new StorageService();
export default storageService;