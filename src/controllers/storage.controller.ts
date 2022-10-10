import express, { Request, Response, Router } from 'express';
import { GetAllVcResponseDTO, GetOneVcResponseDTO, StoreVcRequestDTO, StoreVpRequestDTO } from '../dto/storage.dto';
import storageService from '../services/storage.service';



/**
 * "/storage"
 */
const storageController: Router = express.Router();

// store a VC
storageController.post('/vc', async (req: Request, res: Response) => {
	const body: StoreVcRequestDTO = req.body;

	let did: string = "";
	if (req.user === undefined || req.user.did === undefined) {
		res.status(400).send({err: "DID not found"});
		return;
	}
	else {
		did = req.user.did;
	}

	let vcjwt: string = "";
	console.log('vc jwt = ', body.vcjwt)
	if (body.vcjwt == undefined) {
		res.status(400).send({err: "VC not found"});
		return;
	}
	else {
		vcjwt = body.vcjwt;
	}

	const storeVCRes = await storageService.storeVC(did, vcjwt);

	if (storeVCRes.ok) {
		res.status(200).send({});
	}
	else {
		res.status(400).send({err: storeVCRes.val});
	}

});

// get all VCs
storageController.get('/vc', async (req: Request, res: Response) => {

	let did: string = "";
	if (req.user === undefined || req.user.did === undefined) {
		res.status(400).send({err: "DID not found"});
		return;
	}
	else {
		did = req.user.did;
	}

	const getAllVCsRes = await storageService.getAllVCs(did);
	if (getAllVCsRes.ok) {
		res.status(200).send({ vc_list: getAllVCsRes.val } as GetAllVcResponseDTO);
	}
	else {
		res.status(400).send({err: getAllVCsRes.val});
	}

});



// get a specific VC
storageController.get('/vc/:id', async (req: Request, res: Response) => {

	const vcId = req.params.id;
	if (vcId == undefined || vcId == "") {
		res.status(400).send({err: "VC_ID_NOT_FOUND"});
		return;
	}

	let did: string = "";
	if (req.user == undefined || req.user.did == undefined) {
		res.status(400).send({err: "DID_NOT_FOUND"});
		return;
	}
	else {
		did = req.user.did;
	}

	const getVcRes = await storageService.getVC(did,vcId);
	if (getVcRes.ok) {
		res.status(200).send({vc: getVcRes.val} as GetOneVcResponseDTO);
	}
	else {
		res.status(400).send({err: getVcRes.err});
	}

});

// store a VP
storageController.post('/vp', async (req: Request, res: Response) => {
	const body: StoreVpRequestDTO = req.body;

	let did: string = "";
	if (req.user == undefined || req.user.did == undefined) {
		res.status(400).send({err: "DID_NOT_FOUND"});
		return;
	}
	else {
		did = req.user.did;
	}

	let vpjwt: string = "";
	if( body.vpjwt != undefined ) {
		res.status(400).send({err: "VPJWT_NOT_FOUND"});
		return;
	}
	else {
		vpjwt = body.vpjwt;
	}

	const storeVPRes = await storageService.storeVP(did, vpjwt);

	if (storeVPRes.ok) {
		res.status(200).send({});
	}
	else {
		res.status(400).send({err: storeVPRes.val});
	}
});

// get all VPs
storageController.get('/vp', async (req: Request, res: Response) => {

	let did: string = "";
	if (req.user == undefined || req.user.did == undefined) {
		res.status(400).send({err: "DID_NOT_FOUND"});
		return;
	}
	else {
		did = req.user.did;
	}

	const getAllVPsRes = await storageService.getAllVPs(did);
	if (getAllVPsRes.ok) {
		res.status(200).send({vcs: getAllVPsRes.val});
	}
	else {
		res.status(400).send({err: getAllVPsRes.err});
	}

});

// get a specific VP
storageController.get('/vp/:id', async (req: Request, res: Response) => {

	const vpId = req.params.id;
	if (vpId == undefined || vpId == "") {
		res.status(400).send({err: "VP_ID_NOT_FOUND"});
		return;
	}

	let did: string = "";
	if (req.user == undefined || req.user.did == undefined) {
		res.status(400).send({err: "DID_NOT_FOUND"});
		return;
	}
	else {
		did = req.user.did;
	}

	const getVpRes = await storageService.getVC(did,vpId);
	if (getVpRes.ok) {
		res.status(200).send({vp: getVpRes.val});
	}
	else {
		res.status(400).send({err: getVpRes.err});
	}

});

export default storageController;