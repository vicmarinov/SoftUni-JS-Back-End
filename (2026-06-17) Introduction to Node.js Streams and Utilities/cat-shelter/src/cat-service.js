import { breedService } from './breed-service.js';
import { dataService } from './data-service.js';
import { v4 as createNewUUID } from 'uuid';

const CATS_STORAGE_PATH = './data/cats.json';

async function getAllCats () {
    const catsData = await dataService.getAllRecords(CATS_STORAGE_PATH);

    for (const catRecord of catsData) {
        const catBreed = await breedService.getBreedById(catRecord.breedId);
        catRecord.breedName = catBreed.name;
    }

    return catsData;
}

async function getCatById (catId) {
    const allCatsData = await catService.getAllCats();
    
    const catData = allCatsData.find(catData => catData.id === catId);
    const catBreed = await breedService.getBreedById(catData.breedId);
    catData.breedName = catBreed.name;

    return catData;
}

async function addNewCat (name, description, imageUrl, breedName) {
    const catData = {
        id: createNewUUID(),
        name: name ?? null,
        description: description ?? null,
        imageUrl: imageUrl ?? null,
        breedId: (await breedService.getBreedByName(breedName)).id ?? null
    };

    await dataService.storeRecord(CATS_STORAGE_PATH, catData);
}

async function updateCat (
    catId,
    newName,
    newDescription,
    newImageURL,
    newBreedName
) {
    const updatedCatData = {
        id: catId,
        name: newName ?? null,
        description: newDescription ?? null,
        imageUrl: newImageURL ?? null,
        breedId: await breedService.getBreedByName(newBreedName).id ?? null
    };

    await dataService.updateRecord(
        CATS_STORAGE_PATH,
        catRecord => catRecord.id === catId,
        updatedCatData
    );
}

async function deleteCat (catId) {
    await dataService.deleteRecord(
        CATS_STORAGE_PATH,
        catRecord => catRecord.id !== catId
    );
}

export const catService = {
    getAllCats,
    getCatById,
    addNewCat,
    updateCat,
    deleteCat
};