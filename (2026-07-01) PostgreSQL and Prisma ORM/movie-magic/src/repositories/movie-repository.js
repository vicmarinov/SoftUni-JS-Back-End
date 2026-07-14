import fs from 'fs/promises';
import { v4 as generateUUID } from 'uuid';

async function readDatabase (collectionName) {
    const content = await fs.readFile('./src/database.json');
    const database = JSON.parse(content);

    if (collectionName && !(collectionName in database)) {
        throw new Error(`Cannot find a collection with name "${collectionName} in the database"`);
    }

    return collectionName ? database[collectionName] : database;
}

async function writeDatabase (database) {
    const content = JSON.stringify(database, null, 4);
    await fs.writeFile('./src/database.json', content, { encoding: 'utf-8' });
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
    newMovie.id = generateUUID();

    for (const key in newMovie) {
        newMovie[key] = newMovie[key] || null;
    }

    const database = await readDatabase();
    database.movies.push(newMovie);
    await writeDatabase(database);
}

export const movieRepository = {
    getAll: getAllMovies,
    getById: getMovieById,
    create: createMovie
};