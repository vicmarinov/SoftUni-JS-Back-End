import bcrypt from 'bcrypt';
import { userRepository } from '../repositories';

export async function register ({ email, password }) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = userRepository.create({ email, passwordHash });
    return user;
}