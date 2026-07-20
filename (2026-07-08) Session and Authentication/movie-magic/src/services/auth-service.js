import bcrypt from 'bcrypt';
import JSONWebToken from 'jsonwebtoken';
import { userRepository } from '../repositories/user-repository.js';

async function registerUser (email, password, repeatPassword) {
    if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = { email, passwordHash };
    const createdUser = await userRepository.create(user);

    const authToken = JSONWebToken.sign(
        {
            userId: createdUser.id,
            email: createdUser.email
        },
        process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
    
    return authToken;
}

export const authService = {
    register: registerUser
};