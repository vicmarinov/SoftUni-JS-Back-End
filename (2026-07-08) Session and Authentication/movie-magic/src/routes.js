import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import movieController from './controllers/movie-controller.js';
import actorController from './controllers/actor-controller.js';
import authController from './controllers/auth-controller.js';

const routes = Router();

routes.use('/', homeController);
routes.use('/auth', authController);
routes.use('/movies', movieController);
routes.use('/actors', actorController);

routes.get('*anyOther', (req, res) => {
    res.status(404).render('404', { pageTitle: 'Not Found' });
});

export default routes;