import express, { Request, Response, Router } from 'express';
import { StoreVcRequestDTO, StoreVpRequestDTO } from '../dto/storage.dto';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import storageService from '../services/storage.service';



/**
 * "/storage"
 */
const storageController: Router = express.Router();
storageController.use(AuthMiddleware);

// store a VC
storageController.post('/vc', async (req: Request, res: Response) => {
	const body: StoreVcRequestDTO = req.body;

	let did: string = "";
	if (req.user === undefined || req.user.did === undefined) {
		res.status(400).send({error: "DID not found"});
		return;
	}
	else {
		did = req.user.did;
	}

	let vcjwt: string = "";
	if ( body.vcjwt !== undefined ) {
		res.status(400).send({error: "VC not found"});
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
		res.status(400).send({error: storeVCRes.err});
	}

});

// get all VCs
storageController.get('/vc', async (req: Request, res: Response) => {

	let did: string = "";
	if (req.user === undefined || req.user.did === undefined) {
		res.status(400).send({error: "DID not found"});
		return;
	}
	else {
		did = req.user.did;
	}

	const getAllVCsRes = await storageService.getAllVCs(did);
	if (getAllVCsRes.ok) {
		res.status(200).send({"vcs": getAllVCsRes.val});
	}
	else {
		res.status(400).send({error: getAllVCsRes.err});
	}

});



// get a specific VC
storageController.get('/vc/:id', async (req: Request, res: Response) => {

	const vcId = req.params.id;
	if (vcId === undefined || vcId === "") {
		res.status(400).send({error: "VC ID not found"});
		return;
	}

	let did: string = "";
	if (req.user === undefined || req.user.did === undefined) {
		res.status(400).send({error: "DID not found"});
		return;
	}
	else {
		did = req.user.did;
	}

	const getVcRes = await storageService.getVC(did,vcId);
	if (getVcRes.ok) {
		res.status(200).send({"vc": getVcRes.val});
	}
	else {
		res.status(400).send({error: getVcRes.err});
	}

});

// store a VP
storageController.post('/vp', async (req: Request, res: Response) => {
	const body: StoreVpRequestDTO = req.body;

	let did: string = "";
	if (req.user === undefined || req.user.did === undefined) {
		res.status(400).send({error: "DID not found"});
		return;
	}
	else {
		did = req.user.did;
	}

	let vpjwt: string = "";
	if( body.vpjwt !== undefined ) {
		res.status(400).send({error: "VP not found"});
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
		res.status(400).send({errir: storeVPRes.err});
	}
});

// get all VPs
storageController.get('/vp', async (req: Request, res: Response) => {

	let did: string = "";
	if (req.user === undefined || req.user.did === undefined) {
		res.status(400).send({error: "DID not found"});
		return;
	}
	else {
		did = req.user.did;
	}

	const getAllVPsRes = await storageService.getAllVPs(did);
	if (getAllVPsRes.ok) {
		res.status(200).send({"vcs": getAllVPsRes.val});
	}
	else {
		res.status(400).send({error: getAllVPsRes.err});
	}

});

// get a specific VP
storageController.get('/vp/:id', async (req: Request, res: Response) => {

	const vpId = req.params.id;
	if (vpId === undefined || vpId === "") {
		res.status(400).send({error: "VP ID not found"});
		return;
	}

	let did: string = "";
	if (req.user === undefined || req.user.did === undefined) {
		res.status(400).send({error: "DID not found"});
		return;
	}
	else {
		did = req.user.did;
	}

	const getVpRes = await storageService.getVC(did,vpId);
	if (getVpRes.ok) {
		res.status(200).send({"vp": getVpRes.val});
	}
	else {
		res.status(400).send({error: getVpRes.err});
	}

});

export default storageController;