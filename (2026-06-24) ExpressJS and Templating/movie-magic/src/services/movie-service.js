import { movieRepository } from '../repositories/movie-repository.js';

async function getAllMovies () {
    const movies = await movieRepository.getAll();
    return movies;
}

async function getMovieById (movieId) {
    const movie = await movieRepository.getById(movieId);
    return movie;
}

export const movieService = {
    getAll: getAllMovies,
    getById: getMovieById
};