import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user-repository.js';

async function registerUser (email, password, repeatPassword) {
    if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = { email, passwordHash };
    await userRepository.create(user);
}

export const authService = {
    register: registerUser
};