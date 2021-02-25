import 'reflect-metadata';

import express from 'express';
import createConnection from './database';
import { routes } from './routes';

createConnection();

const server = express();

server.use(express.json())
server.use(routes);


export { server };
