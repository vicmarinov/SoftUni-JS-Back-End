import { prisma } from '../lib/prisma.js';

export async function getByEmail (email) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        return user;
    } catch (error) {
        throw new Error('Failed to find user.');
    }
}

export async function create ({ email, passwordHash }) {
    try {
        const user = await prisma.user.create({
            data: { email, passwordHash }
        });
    
        return user;
    } catch (error) {
        if (error.code === 'P2002') {
            throw new Error('Email already exists.');
        }

        throw new Error('Failed to create user.');
    }
}