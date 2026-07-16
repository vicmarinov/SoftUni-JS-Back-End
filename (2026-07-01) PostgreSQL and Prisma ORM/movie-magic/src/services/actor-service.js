import { actorRepository } from '../repositories/actor-repository.js';

async function createActor (name, age, placeOfBirth, imageURL) {
    const newActor = { name, age: Number(age), placeOfBirth, imageURL };
    await actorRepository.create(newActor);
}

export const actorService = {
    create: createActor
};