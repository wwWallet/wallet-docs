import express, { Request, Response, Router } from 'express';
import { ConstructProofRequestDTO } from '../dto/issuance.dto';
import { AppTokenUser, AuthMiddleware } from '../middlewares/auth.middleware';
import keyManagementService from '../services/keyManagement.service';



/**
 * "/issuance"
 * This controller will be used on the issuance phase
 */
const issuanceController: Router = express.Router();
// issuanceController.use(AuthMiddleware);


issuanceController.post('/construct/proof', async (req: Request, res: Response) => {

	// const user = req.user as AppTokenUser;
	const user = {did: "did:ebsi:znKvDSfGzg1iFnfGbvnQGMLAna49LcaGvZNrdnAzqUoYZ"}
	const body: ConstructProofRequestDTO = req.body;

	const result = await keyManagementService.constructProof(
		user.did,
		body.rsaPublicKey,
		body.c_nonce,
		body.issuerDID);
	if (!result.ok) {
		res.status(500).send({err: result.val});
		return;
	}
	const { encryptedProof } = result.val;
		
	res.status(200).send({ encryptedProof });
});

export default issuanceController;