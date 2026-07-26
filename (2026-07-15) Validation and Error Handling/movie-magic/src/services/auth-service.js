import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user-repository.js';
import { generateAuthToken } from '../utils/tokenUtils.js';

async function registerUser (email, password, repeatPassword) {
    if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = { email, passwordHash };
    const createdUser = await userRepository.create(user);

    const authToken = generateAuthToken(createdUser.id, createdUser.email);
    return authToken;
}

async function loginUser (email, password) {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const authToken = generateAuthToken(user.id, user.email);
    return authToken;
}

export const authService = {
    register: registerUser,
    login: loginUser
};