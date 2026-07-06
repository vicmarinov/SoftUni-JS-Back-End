import fs from 'fs/promises';

async function readDatabase (collectionName) {
    const content = await fs.readFile('./src/database.json');
    const database = JSON.parse(content);

    if (collectionName && !(collectionName in database)) {
        throw new Error(`Cannot find a collection with name "${collectionName} in the database"`);
    }

    return collectionName ? database[collectionName] : database;
}

async function getAllMovies () {
    const movies = await readDatabase('movies');
    return movies;
}

export const movieRepository = {
    getAll: getAllMovies
};