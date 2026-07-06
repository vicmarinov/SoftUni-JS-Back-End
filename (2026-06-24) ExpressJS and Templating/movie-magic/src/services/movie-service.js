import { movieRepository } from '../repositories/movie-repository.js';

async function getAllMovies () {
    const movies = await movieRepository.getAll();
    return movies;
}

export const movieService = {
    getAll: getAllMovies
};