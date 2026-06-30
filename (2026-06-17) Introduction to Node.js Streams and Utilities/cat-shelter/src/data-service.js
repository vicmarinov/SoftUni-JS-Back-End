import fs from 'fs/promises';

async function getAllRecords (storagePath, filterPredicate = () => true) {
    const dataAsString = await fs.readFile(storagePath, 'utf-8');
    return JSON.parse(dataAsString).filter(filterPredicate);
}

async function rewriteStorage (storagePath, data) {
    const dataAsString = JSON.stringify(data, null, 4);
    await fs.writeFile(storagePath, dataAsString, { encoding: 'utf-8' });
}

async function storeRecord (storagePath, recordToAdd) {
    const data = await dataService.getAllRecords(storagePath);
    data.push(recordToAdd);
    await rewriteStorage(storagePath, data);
}

async function updateRecord (storagePath, updatePredicate, updatedRecord) {
    const data = await dataService.getAllRecords(storagePath);
    const recordToUpdate = data.find(updatePredicate);
    if (!recordToUpdate) throw new Error(`Cannot find a record in ${storagePath} that is matching this update predicate: ${updatePredicate.toString()}`);
    
    for (const key in updatedRecord) {
        recordToUpdate[key] = updatedRecord[key];
    }

    await rewriteStorage(storagePath, data);
}

async function deleteRecord (storagePath, notToDeletePredicate) {
    const dataBeforeDeletion = await dataService.getAllRecords(storagePath);
    const dataAfterDeletion = dataBeforeDeletion.filter(notToDeletePredicate);

    if (dataBeforeDeletion.length === dataAfterDeletion.length) {
        throw new Error(`There are not records to delete in ${storagePath} that are not matching this not to delete predicate: ${notToDeletePredicate.toString()}`);
    }

    await rewriteStorage(storagePath, dataAfterDeletion);
}

export const dataService = {
    getAllRecords,
    storeRecord,
    updateRecord,
    deleteRecord
};