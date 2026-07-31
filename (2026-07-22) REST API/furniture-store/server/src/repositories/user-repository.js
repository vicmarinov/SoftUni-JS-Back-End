import { prisma } from '../lib/prisma.js';

export function create ({ email, passwordHash }) {
    const user = prisma.user.create({
        data: { email, passwordHash }
    });

    return user;
}