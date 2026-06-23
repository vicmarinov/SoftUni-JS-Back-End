import { dataService } from './data-service.js';
import { v4 as createNewUUID } from 'uuid';

const BREEDS_STORAGE_PATH = './data/breeds.json';

async function getAllBreeds () {
    return await dataService.getAllRecords(BREEDS_STORAGE_PATH);
}

async function getBreedById (breedId) {
    const allBreeds = await breedService.getAllBreeds();
    return allBreeds.find(breedData => breedData.id === breedId);
}

async function getBreedByName (breedName) {
    const allBreeds = await breedService.getAllBreeds();
    return allBreeds.find(breedData => breedData.name === breedName);
}

async function addNewBreed (breedName) {
    if (!breedName) throw new Error('Cannot add a breed without name');
    
    const breedData = {
        id: createNewUUID(),
        name: breedName
    };

    await dataService.storeRecord(BREEDS_STORAGE_PATH, breedData);
}

export const breedService = {
    getAllBreeds,
    getBreedById,
    getBreedByName,
    addNewBreed
};