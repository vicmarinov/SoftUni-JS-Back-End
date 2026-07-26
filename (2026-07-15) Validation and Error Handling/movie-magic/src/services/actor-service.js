import { actorRepository } from '../repositories/actor-repository.js';

async function getAllActors (excludeActors) {
    const actors = await actorRepository.getAll(excludeActors);
    return actors;
}

async function createActor ({ name, age, placeOfBirth, imageURL }) {
    const newActor = { name, age, placeOfBirth, imageURL };
    await actorRepository.create(newActor);
}

export const actorService = {
    getAll: getAllActors,
    create: createActor
};