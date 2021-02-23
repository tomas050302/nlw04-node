import 'reflect-metadata';
import express from 'express';

import './database';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const port = 3333 || process.env.PORT;

app.listen(port, () => console.log(`App listening on port ${port}`));
