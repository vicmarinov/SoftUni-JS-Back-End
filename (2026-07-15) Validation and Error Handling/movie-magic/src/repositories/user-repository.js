import { prisma } from '../lib/prisma.js';

async function getUserByEmail (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
}

async function createUser (newUser) {
    return await prisma.user.create({ data: newUser });
}

export const userRepository = {
    getByEmail: getUserByEmail,
    create: createUser
};