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
        include: {
            cast: {
                include: { actor: true }
            }
        }
    });

    return movie;
}

async function createMovie (newMovie) {
    try {
        await prisma.movie.create({ data: newMovie });
    } catch (error) {
        throw new Error('Failed to create movie');
    }
}

async function attachActorToMovieCast (movieId, actorId, roleName) {
    await prisma.movieCast.create({
        data: { movieId, actorId, roleName }
    });
}

async function editMovie (movieId, creatorId, newMovieData) {
    try {
        await prisma.movie.update({
            where: { id: movieId, createdBy: creatorId },
            data: newMovieData
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error('Movie not found or you are not authorized to edit it');
        }
        
        throw new Error('Failed to edit movie');
    }
}

async function deleteMovie (movieId, creatorId) {
    await prisma.movie.delete({
        where: {
            id: movieId,
            createdBy: creatorId
        }
    });
}

export const movieRepository = {
    getAll: getAllMovies,
    getById: getMovieById,
    create: createMovie,
    attachToCast: attachActorToMovieCast,
    edit: editMovie,
    delete: deleteMovie
};