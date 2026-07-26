import { Router } from 'express';
import { MOVIE_CATEGORIES, movieService } from '../services/movie-service.js';
import { actorService } from '../services/actor-service.js';
import { authGuard } from '../middlewares/auth-middleware.js';

const movieController = Router();

movieController.get('/create', authGuard.isAuth, (req, res) => {
    const movieCategoriesList = Object.entries(MOVIE_CATEGORIES)
        .map(([code, title]) => ({ code, title }));
    
    res.render('movies/create', { pageTitle: 'Add Movie Post', movieCategoriesList });
});

movieController.post('/create', authGuard.isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;
    await movieService.create(
        newMovie.title,
        newMovie.category,
        newMovie.genre,
        newMovie.director,
        newMovie.year,
        newMovie.imageURL,
        newMovie.rating,
        newMovie.description,
        userId
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

movieController.get('/:movieId/edit', authGuard.isAuth, async (req, res) => {
    const movie = await movieService.getById(req.params.movieId);
    if (req.user.id !== movie.createdBy) {
        throw new Error('You are not authorized to edit this movie post!');
    }

    const movieCategoriesList = Object.entries(MOVIE_CATEGORIES)
        .map(([code, title]) => ({
            code,
            title,
            isSelected: title === movie.category
        }));

    res.render('movies/edit', { pageTitle: 'Edit Movie Post', movie, movieCategoriesList });
});

movieController.post('/:movieId/edit', authGuard.isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;
    const newMovieData = req.body;

    await movieService.edit(
        movieId,
        userId,
        newMovieData.title,
        newMovieData.category,
        newMovieData.genre,
        newMovieData.director,
        newMovieData.year,
        newMovieData.imageURL,
        newMovieData.rating,
        newMovieData.description
    );
    
    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/delete', authGuard.isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    await movieService.delete(movieId, userId);
    res.redirect('/');
});

movieController.get('/:movieId', async (req, res) => {
    const movie = await movieService.getById(req.params.movieId);
    const ratingStarsString = '&#x2605;'.repeat(Math.trunc(movie.rating));
    const isUserCreatorOfMovie = !!req.user && req.user.id === movie.createdBy;
    
    res.render(
        'movies/details',
        {
            pageTitle: movie.title,
            movie,
            ratingStarsString,
            isUserCreatorOfMovie
        }
    );
});

export default movieController;