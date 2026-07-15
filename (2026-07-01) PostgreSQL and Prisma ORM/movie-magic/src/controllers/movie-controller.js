import { Router } from 'express';
import { movieService } from '../services/movie-service.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create', { pageTitle: 'Add Movie Post' });
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    await movieService.crate(
        newMovie.title,
        newMovie.category,
        newMovie.genre,
        newMovie.director,
        newMovie.year,
        newMovie.imageURL,
        newMovie.rating,
        newMovie.description
    );

    res.redirect('/');
});

movieController.get('/search', async (req, res) => {
    const filters = req.query;
    const movies = await movieService.getAll(filters);
    res.render('movies/search', { pageTitle: 'Search Movies', filters, movies });
});

movieController.get('/:movieId', async (req, res) => {
    const movie = await movieService.getById(req.params.movieId);
    const ratingStarsString = '&#x2605;'.repeat(Math.trunc(movie.rating));
    res.render('movies/details', { pageTitle: movie.title, movie, ratingStarsString });
});

export default movieController;