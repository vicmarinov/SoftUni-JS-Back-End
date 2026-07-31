import { Router } from 'express';
import { authController } from './controllers';

const routes = Router();

routes.use('/users', authController);

export default routes;