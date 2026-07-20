import { prisma } from '../lib/prisma.js';

async function createUser (newUser) {
    return await prisma.user.create({ data: newUser });
}

export const userRepository = {
    create: createUser
};