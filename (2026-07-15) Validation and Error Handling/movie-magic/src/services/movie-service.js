import { movieRepository } from '../repositories/movie-repository.js';
import { MOVIE_CATEGORIES } from '../schemas/movie-schema.js';

async function getAllMovies (filters) {
    const movies = await movieRepository.getAll(filters);
    return movies;
}

async function getMovieById (movieId) {
    const movie = await movieRepository.getById(movieId);
    return movie;
}

async function createMovie (
    {
        title,
        category,
        genre,
        director,
        year,
        imageURL,
        rating,
        description
    },
    creatorId
) {
    const newMovie = {
        title,
        category,
        genre,
        director,
        year,
        imageURL,
        rating,
        description,
        createdBy: creatorId
    };

    await movieRepository.create(newMovie);
}

async function attachActorToMovieCast (movieId, actorId, roleName) {
    await movieRepository.attachToCast(movieId, actorId, roleName);
}

async function editMovie (
    movieId,
    creatorId,
    {
        title,
        category,
        genre,
        director,
        year,
        imageURL,
        rating,
        description
    }
) {
    const newMovieData = {
        title,
        category,
        genre,
        director,
        year,
        imageURL,
        rating,
        description
    };

    await movieRepository.edit(movieId, creatorId, newMovieData);
}

async function deleteMovie (movieId, creatorId) {
    await movieRepository.delete(movieId, creatorId);
}

export const movieService = {
    getAll: getAllMovies,
    getById: getMovieById,
    create: createMovie,
    attachToCast: attachActorToMovieCast,
    edit: editMovie,
    delete: deleteMovie
};