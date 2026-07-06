import { Router } from 'express';
import { movieService } from '../services/movie-service.js';

const homeController = new Router();

homeController.get('/', async (req, res) => {
    const allMovies = await movieService.getAll();
    res.render('home', { pageTitle: 'Movie Magic', allMovies });
});

homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About Us' });
});

export default homeController;