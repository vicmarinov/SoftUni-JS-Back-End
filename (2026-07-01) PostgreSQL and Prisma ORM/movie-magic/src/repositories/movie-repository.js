import fs from 'fs/promises';
import { prisma } from '../lib/prisma.js';

async function readDatabase (collectionName) {
    const content = await fs.readFile('./src/database.json');
    const database = JSON.parse(content);

    if (collectionName && !(collectionName in database)) {
        throw new Error(`Cannot find a collection with name "${collectionName} in the database"`);
    }

    return collectionName ? database[collectionName] : database;
}

async function getAllMovies (filters) {
    let movies = await readDatabase('movies');

    for (const parameter in filters) {
        movies = movies.filter(movie => {
            if (!parameter) return true;

            const movieValue = movie[parameter].toString().toLowerCase();
            const filterValue = filters[parameter].toString().toLowerCase();
            return movieValue.includes(filterValue);
        });
    }
    return movies;
}

async function getMovieById (movieId) {
    const allMovies = await movieRepository.getAll();
    const movie = allMovies.find(movie => movie.id === movieId);
    return movie;
}

async function createMovie (newMovie) {
    await prisma.movie.create({ data: newMovie });
}

export const movieRepository = {
    getAll: getAllMovies,
    getById: getMovieById,
    create: createMovie
};