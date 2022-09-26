import express, { Request, Response, Router } from 'express';
import { StoreVcRequestDTO } from '../dto/storage.dto';
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
	if (req.user != undefined && req.user.did != undefined) {
		console.log("Did = ", req.user.did);
	}
	res.send({});
});

// get all VCs
storageController.get('/vc', async (req: Request, res: Response) => {
	const vcId = req.params.id;
	res.send({'shit': 'dd'});
});



// get a specific VC
storageController.get('/vc/:id', async (req: Request, res: Response) => {
	const vcId = req.params.id;
	res.send({});
});

export default storageController;