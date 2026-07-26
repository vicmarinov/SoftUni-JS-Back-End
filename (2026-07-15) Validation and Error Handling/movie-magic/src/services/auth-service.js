import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user-repository.js';
import { generateAuthToken } from '../utils/token-utils.js';

async function registerUser ({ email, password, repeatPassword }) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ email, passwordHash });

    const authToken = generateAuthToken(user);
    return authToken;
}

async function loginUser ({ email, password }) {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const authToken = generateAuthToken(user);
    return authToken;
}

export const authService = {
    register: registerUser,
    login: loginUser
};