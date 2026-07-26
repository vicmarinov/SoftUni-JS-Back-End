import { prisma } from '../lib/prisma.js';

async function getUserByEmail (email) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        throw new Error('Failed to retrieve user');
    }
}

async function createUser (newUser) {
    try {
        return await prisma.user.create({ data: newUser });
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error('Email already exists');
        }

        throw new Error('Failed to create user');
    }
}

export const userRepository = {
    getByEmail: getUserByEmail,
    create: createUser
};