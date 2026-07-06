import { Router } from 'express';
import { movieService } from '../services/movie-service.js';

const homeController = new Router();

homeController.get('/', async (req, res) => {
    const allMovies = await movieService.getAll();
    res.render('home', { allMovies });
});

homeController.get('/about', (req, res) => {
    res.render('about')
});

export default homeController;