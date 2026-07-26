import * as zod from 'zod';

const userRegisterSchema = zod.object({
    email: zod.email('Invalid email address'),
    password: zod.string()
        .regex(/^[A-Za-z0-9]+$/, 'Password must contain only English letters and numbers')
        .min(6, 'Password must be at least 6 characters long'),
    repeatPassword: zod.string()
}).refine(
    (data) => data.repeatPassword && data.password === data.repeatPassword,
    {
        path: ['repeatPassword'],
        error: 'Passwords do not match'
    }
);

const userLoginSchema = zod.object({
    email: zod.email('Invalid email address'),
    password: zod.string()
        .nonempty('Password is required')
});

export const userSchema = {
    register: userRegisterSchema,
    login: userLoginSchema
};