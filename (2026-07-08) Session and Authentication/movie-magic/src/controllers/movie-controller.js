import { Router } from 'express';
import { movieService } from '../services/movie-service.js';
import { actorService } from '../services/actor-service.js';
import { authGuard } from '../middlewares/auth-middleware.js';

const movieController = Router();

movieController.get('/create', authGuard.isAuth, (req, res) => {
    res.render('movies/create', { pageTitle: 'Add Movie Post' });
});

movieController.post('/create', authGuard.isAuth, async (req, res) => {
    const newMovie = req.body;
    await movieService.create(
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

movieController.get('/:movieId/attach-actor', authGuard.isAuth, async (req, res) => {
    const movie = await movieService.getById(req.params.movieId);
    const actors = await actorService.getAll(movie.cast);
    res.render('movies/attach-actor', { pageTitle: movie.title, movie, actors });
});

movieController.post('/:movieId/attach-actor', authGuard.isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const { actor: actorId, roleName } = req.body;

    await movieService.attachToCast(movieId, actorId, roleName);
    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId', async (req, res) => {
    const movie = await movieService.getById(req.params.movieId);
    const ratingStarsString = '&#x2605;'.repeat(Math.trunc(movie.rating));
    res.render('movies/details', { pageTitle: movie.title, movie, ratingStarsString });
});

export default movieController;