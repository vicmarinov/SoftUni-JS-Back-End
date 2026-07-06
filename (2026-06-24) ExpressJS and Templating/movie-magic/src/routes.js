import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import movieController from './controllers/movie-controller.js';

const routes = new Router();

routes.use('/', homeController);
routes.use('/movies', movieController);

routes.get('*anyOther', (req, res) => {
    res.status(404).render('404', { pageTitle: 'Not Found' });
});

export default routes;