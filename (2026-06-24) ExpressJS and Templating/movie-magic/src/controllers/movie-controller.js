import { Router } from 'express';
import { movieService } from '../services/movie-service.js';

const movieController = new Router();

movieController.get('/:movieId', async (req, res) => {
    const movie = await movieService.getById(req.params.movieId);
    const ratingStarsString = '&#x2605;'.repeat(Math.trunc(movie.rating));
    res.render('movies/details', { movie, ratingStarsString });
});

export default movieController;