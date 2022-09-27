import { getAudienceDID, getIssuerDID, getVCIdentifier } from "@gunet/ssi-pack";
import { Err, Ok, Result } from "ts-results";
import { Vc } from "../entities/vc.entity";
import { Vp } from "../entities/vp.entity";
import { vcRepository } from "../repositories/vc.repository";
import { vpRepository } from "../repositories/vp.repository";
import { GetAllVcByDidErrors, GetAllVpByDidErrors, GetVcErrors, GetVpErrors, StoreVcErrors, StoreVpErrors } from "../types/errors/storage.errors";


class StorageService {


	constructor() { }

	// Store a VC in the db
	async storeVC(holderDID: string, vcjwt: string): Promise<Result<null, StoreVcErrors>> {

		var vcIdentifier: string = "";
		try {
			vcIdentifier = getVCIdentifier(vcjwt);
		}
		catch(err) {
			return Err('VC_ID_ERR');
		}

		var issuerDID: string = "";
		try {
			issuerDID = getIssuerDID(vcjwt);
		}
		catch(err) {
			return Err('VC_ISS_ERR');
		}
		
		const createVcRes = await vcRepository.createVc(vcIdentifier, holderDID, issuerDID, vcjwt);

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

	// Get a specific VC using its Identifier
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

	// Store a VP in the db
	async storeVP(holderDID: string, vpjwt: string): Promise<Result<null, StoreVpErrors>> {

		var vpIdentifier: string = "";
		try {
			vpIdentifier = getVCIdentifier(vpjwt);
		}
		catch(err) {
			return Err('VP_ID_ERR');
		}

		var issuerDID: string = "";
		try {
			issuerDID = getIssuerDID(vpjwt);
		}
		catch(err) {
			return Err('VP_ISS_ERR');
		}

		var audienceDID: string = "";
		try {
			audienceDID = getAudienceDID(vpjwt);
		}
		catch(err) {
			return Err('VP_AUD_ERR');
		}

		const createVpRes = await vpRepository.createVp(vpjwt, holderDID, vpIdentifier, issuerDID, audienceDID);

		if(createVpRes.ok) {
			return Ok(null);
		}
		else {
			return Err(createVpRes.val);
		}
	}

	// Get all VPs of a holder with a speficic DID
	async getAllVPs(holderDID: string): Promise<Result<Vp[], GetAllVpByDidErrors>> {

		const getAllVPsRes = await vpRepository.getAllVpsByDid(holderDID);

		if(getAllVPsRes.ok) {
			return Ok(getAllVPsRes.val);
		}
		else {
			console.log(getAllVPsRes.err);
			return Err(getAllVPsRes.val);
		}
	}

	// Get a specific VP using its Identifier
	async getVP(holderDID: string, vpIdentifier: string): Promise<Result<Vp, GetVpErrors>> {

		const getVPRes = await vpRepository.getVpById(holderDID, vpIdentifier);

		if(getVPRes.ok) {
			return Ok(getVPRes.val);
		}
		else {
			console.log(getVPRes.err);
			return Err(getVPRes.val);
		}

	}

}

const storageService = new StorageService();
export default storageService;