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

async function editMovie (
    movieId,
    creatorId,
    newTitle,
    newCategory,
    newGenre,
    newDirector,
    newYear,
    newImageURL,
    newRating,
    newDescription
) {
    const editedFields = {};
    
    if (newTitle) editedFields.title = newTitle;
    if (newCategory) editedFields.category = MOVIE_CATEGORIES[newCategory];
    if (newGenre) editedFields.genre = newGenre;
    if (newDirector) editedFields.director = newDirector;
    if (newYear) editedFields.year = Number(newYear);
    if (newImageURL) editedFields.imageURL = newImageURL;
    if (newRating) editedFields.rating = Number(newRating);
    if (newDescription) editedFields.description = newDescription;

    await movieRepository.edit(movieId, creatorId, editedFields);
}

export const movieService = {
    getAll: getAllMovies,
    getById: getMovieById,
    create: createMovie,
    attachToCast: attachActorToMovieCast,
    edit: editMovie
};