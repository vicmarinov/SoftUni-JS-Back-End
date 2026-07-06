import { Router } from 'express';
import homeController from './controllers/home-controller.js';

const routes = new Router();

routes.use('/', homeController);

routes.get('*anyOther', (req, res) => {
    res.status(404).render('404');
});

export default routes;