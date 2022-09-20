import express, { Express, Request, Response } from 'express';
import config from '../config/config.dev';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import userController from './controllers/user.controller';

const app: Express = express();

// __dirname is "/path/to/dist/src"

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');

// __dirname is "/path/to/dist/src"
// public is located at "/path/to/dist/src"
app.use(cors({ credentials: true, origin: true }));


// define routes and middleware here
app.use('/user', userController);

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at http://${config.host}:${config.port}`);
});