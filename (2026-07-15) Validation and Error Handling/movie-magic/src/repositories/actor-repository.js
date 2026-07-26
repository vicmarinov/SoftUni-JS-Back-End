import { prisma } from '../lib/prisma.js';

async function getAllActors (excludeActors = []) {
    const actors = await prisma.actor.findMany({
        where: {
            id: { notIn: excludeActors.map(actor => actor.actorId) }
        }
    });

    return actors;
}

async function createActor (newActor) {
    try {
        await prisma.actor.create({ data: newActor });
    } catch (error) {
        throw new Error('Failed to create actor');
    }
}

export const actorRepository = {
    getAll:  getAllActors,
    create: createActor
};