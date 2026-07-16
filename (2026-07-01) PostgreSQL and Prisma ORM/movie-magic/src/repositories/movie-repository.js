import { prisma } from '../lib/prisma.js';

async function getAllMovies (filters = {}) {
    const movies = await prisma.movie.findMany({
        where: {
            title: {
                contains: filters.title || undefined,
                mode: 'insensitive'
            },
            genre: {
                contains: filters.genre || undefined,
                mode: 'insensitive'
            },
            year: filters.year && Number.isInteger(Number(filters.year)) ?
                Number(filters.year) : undefined
        }
    });

    return movies;
}

async function getMovieById (movieId) {
    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId
        },
        include: { cast: true }
    });

    return movie;
}

async function createMovie (newMovie) {
    await prisma.movie.create({ data: newMovie });
}

async function attachActorToMovieCast (movieId, actorId, roleName) {
    await prisma.movieCast.create({
        data: { movieId, actorId, roleName }
    });
}

export const movieRepository = {
    getAll: getAllMovies,
    getById: getMovieById,
    create: createMovie,
    attachToCast: attachActorToMovieCast
};