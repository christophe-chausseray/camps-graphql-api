import dotenv from 'dotenv';
import { Server } from './infrastructure/server/express';

dotenv.config();

Server.start();
