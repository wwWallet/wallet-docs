import express, { Request, Response, Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import tirManagementService from "../services/tirManagement.service";


/*
 * "/tir"
 */
const tirManagementController: Router = express.Router();
tirManagementController.use(AuthMiddleware);

// update TIR
tirManagementController.get('/fetch', async (req: Request, res: Response) => {

	const fetchIssuersRes = await tirManagementService.fetchIssuers();
	if(fetchIssuersRes.ok)
		res.status(200).send({});
	else
		res.status(400).send({error: fetchIssuersRes.err});

});

// clear TIR
tirManagementController.get('/clear', async (req: Request, res: Response) => {
	const clearTirRes = await tirManagementService.clearTIR();
	if(clearTirRes.ok)
		res.status(200).send({});
	else
		res.status(400).send({error: clearTirRes.err});
});

// query saved TIR
tirManagementController.get('/search', async (req: Request, res: Response) => {

	var query: string = "";
	if( req.query.institution === undefined || typeof req.query.institution !== 'string' ) {
		res.status(400).send({error: 'Invalid Issuer Institution Search'})
		return;
	}
	else {
		query = req.query.institution;
	}

	const searchIssuerRes = await tirManagementService.getIssuersByInstitutionName(query);

	if(searchIssuerRes.ok)
		res.status(200).send({issuers: searchIssuerRes.val});
	else
		res.status(400).send({error: searchIssuerRes.val});
});

export default tirManagementController