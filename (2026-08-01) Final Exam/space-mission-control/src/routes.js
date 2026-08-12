import { Router } from 'express';
import authController from './controllers/auth-controller.js';
import missionController from './controllers/mission-controller.js';
import homeController from './controllers/home-controller.js';
import publicRestAPIController from './controllers/public-rest-api-controller.js';

const routes = Router();

routes.use('/', homeController);
routes.use('/auth', authController);
routes.use('/missions', missionController);
routes.use('/api', publicRestAPIController);

routes.use((req, res) => res.render('404'));

export default routes;