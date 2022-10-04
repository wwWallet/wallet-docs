import express, { Express, Request, Response } from 'express';
import config from '../config/config.dev';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userController from './controllers/user.controller';
import storageController from './controllers/storage.controller';
import crossDeviceWalletSyncController from './controllers/crossDeviceWalletSync.controller';
import tirManagementController from './controllers/tirManagement.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';

const app: Express = express();

// __dirname is "/path/to/dist/src"

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// __dirname is "/path/to/dist/src"
// public is located at "/path/to/dist/src"
app.use(cors({ credentials: true, origin: true }));


// define routes here
app.use('/user', userController);


app.use(AuthMiddleware);

// all the following endpoints are guarded by the AuthMiddleware
app.use('/storage', storageController);
app.use('/sync', crossDeviceWalletSyncController);
app.use('/tir', tirManagementController);

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at ${config.url}`);
});