import * as zod from 'zod';
import bcrypt from 'bcrypt';

const register = zod.object({
    email: zod.email('Invalid email address.')
        .min(10, 'Email must be at least 10 characters long.'),
    password: zod.string()
        .min(4, 'Password must be at least 4 characters long.'),
    rePassword: zod.string()
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match.',
    path: ['rePassword'],
}).transform(async ({ email, password }) => {
    const passwordHash = await bcrypt.hash(password, 10);

    return {
        email: email,
        password: passwordHash,
    };
});

const login = zod.object({
    email: zod.email('Invalid email address.'),
    password: zod.string()
        .nonempty('Password is required.'),
});

export const authSchema = {
    register,
    login,
};