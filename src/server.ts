import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import createConnection from './database/index';
import routes from './routes';

import errorHandler from './errors/handler';

createConnection();
const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use(errorHandler);

export default app;
