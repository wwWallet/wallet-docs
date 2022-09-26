import express, { Request, Response, Router } from 'express';
import { AppTokenUser, AuthMiddleware } from '../middlewares/auth.middleware';
import crossDeviceWalletSyncService from '../services/crossDeviceWalletSync.service';



/**
 * "/sync"
 * This controller will be used for Cross-Device Wallet Syncing
 */
const crossDeviceWalletSyncController: Router = express.Router();
crossDeviceWalletSyncController.use(AuthMiddleware);

crossDeviceWalletSyncController.get('/import', async (req: Request, res: Response) => {

	// Generate state token
	const stateToken: string = crossDeviceWalletSyncService.generateImportURI();

	res.status(200).send({ stateToken });

});

crossDeviceWalletSyncController.get('/export', async (req: Request, res: Response) => {

	// Get DID from Authenticated Session
	const did: string = "did:ebsi:test1234";

	// Generate state token
	const stateToken: string = crossDeviceWalletSyncService.generateExportURI(did);

	res.status(200).send({ stateToken });

});

export default crossDeviceWalletSyncController;