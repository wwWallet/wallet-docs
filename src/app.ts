import express, { Express, Request, Response } from 'express';
import config from '../config/config.dev';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userController from './controllers/user.controller';
import storageController from './controllers/storage.controller';
import issuanceController from './controllers/issuance.controller';
import crossDeviceWalletSyncController from './controllers/crossDeviceWalletSync.controller';

const app: Express = express();

// __dirname is "/path/to/dist/src"

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// __dirname is "/path/to/dist/src"
// public is located at "/path/to/dist/src"
app.use(cors({ credentials: true, origin: true }));


// define routes and middleware here
app.use('/user', userController);
app.use('/storage', storageController);
app.use('/issuance', issuanceController);
app.use('/sync', crossDeviceWalletSyncController);

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at http://${config.host}:${config.port}`);
});