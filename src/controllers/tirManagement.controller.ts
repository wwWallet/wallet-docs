import express, { Request, Response, Router } from "express";
import tirManagementService from "../services/tirManagement.service";


/*
 * "/tir"
 */
const tirManagementController: Router = express.Router();

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

	var institution: string = "";
	if( req.query.institution !== undefined && typeof req.query.institution === 'string' )
		institution = req.query.institution;
	var country: string = "";
	if( req.query.country !== undefined && typeof req.query.country === 'string' )
		country = req.query.country;

	const searchIssuerRes = await tirManagementService.getIssuersByInstitutionName(institution, country);

	if(searchIssuerRes.ok)
		res.status(200).send({issuers: searchIssuerRes.val});
	else
		res.status(400).send({error: searchIssuerRes.val});
});

export default tirManagementController