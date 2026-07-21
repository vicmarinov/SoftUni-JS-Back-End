import { movieRepository } from '../repositories/movie-repository.js';

export const MOVIE_CATEGORIES = {
    "tv-show": "TV Show",
    "animation": "Animation",
    "movie": "Movie",
    "documentary": "Documentary",
    "short-film": "Short Film"
};

async function getAllMovies (filters) {
    const movies = await movieRepository.getAll(filters);
    return movies;
}

async function getMovieById (movieId) {
    const movie = await movieRepository.getById(movieId);
    return movie;
}

async function createMovie (
    title,
    category,
    genre,
    director,
    year,
    imageURL,
    rating,
    description,
    creatorId
) {
    const newMovie = {
        title,
        category: MOVIE_CATEGORIES[category],
        genre,
        director,
        year: Number(year),
        imageURL,
        rating: Number(rating),
        description,
        createdBy: creatorId
    };

    await movieRepository.create(newMovie);
}

async function attachActorToMovieCast (movieId, actorId, roleName) {
    await movieRepository.attachToCast(movieId, actorId, roleName);
}

export const movieService = {
    getAll: getAllMovies,
    getById: getMovieById,
    create: createMovie,
    attachToCast: attachActorToMovieCast
};