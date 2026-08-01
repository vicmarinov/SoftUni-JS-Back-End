import { Router } from 'express';
import { authController, furnitureController } from './controllers';

const routes = Router();

routes.use('/users', authController);
routes.use('/data/catalog', furnitureController);

export default routes;