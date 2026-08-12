import { prisma } from '../lib/prisma.js';
import { generateAuthToken } from '../utils/token-utils.js';
import bcrypt from 'bcrypt';

async function register ({ email, password }) {
    const user = await prisma.user.create({ data: { email, password } });
    const authToken = generateAuthToken(user);
    return authToken;
}

async function login ({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid email or password.');

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) throw new Error('Invalid email or password.');
    
    const authToken = generateAuthToken(user);
    return authToken;
}

export const authService = {
    register,
    login,
};