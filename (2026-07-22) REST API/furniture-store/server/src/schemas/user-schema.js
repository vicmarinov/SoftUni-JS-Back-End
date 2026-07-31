import * as zod from 'zod';

export const register = zod.object({
    email: zod.email('Invalid email address.'),
    password: zod.string('Invalid password.')
        .min(6, 'Password must be at least 6 characters long.')
});

export const login = zod.object({
    email: zod.email('Invalid email address.'),
    password: zod.string('Invalid password.')
});