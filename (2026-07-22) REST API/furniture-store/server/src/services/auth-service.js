import bcrypt from 'bcrypt';
import { userRepository } from '../repositories';
import { generateAuthToken } from '../utils';

export async function register ({ email, password }) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepository.create({ email, passwordHash });
    const authToken = generateAuthToken(user);
    
    const registrationResult = {
        accessToken: authToken,
        _id: user.id,
        email: user.email
    }

    return registrationResult;
}

export async function login ({ email, password }) {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new Error('Invalid email or password.')
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw new Error('Invalid email or password.');

    const authToken = generateAuthToken(user);

    const loginResult = {
        accessToken: authToken,
        _id: user.id,
        email: user.email
    };

    return loginResult;
}