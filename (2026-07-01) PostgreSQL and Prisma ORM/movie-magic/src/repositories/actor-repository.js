import { prisma } from '../lib/prisma.js';

async function createActor (newActor) {
    await prisma.actor.create({ data: newActor });
}

export const actorRepository = {
    create: createActor
};