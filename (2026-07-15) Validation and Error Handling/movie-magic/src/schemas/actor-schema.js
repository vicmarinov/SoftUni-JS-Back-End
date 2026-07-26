import * as zod from 'zod';

const actorCreateSchema = zod.object({
    name: zod.string()
        .trim()
        .regex(/^[A-Za-z0-9 ]+$/, 'Name must contain only English letters, numbers and spaces')
        .min(5, 'Name must be at least 5 characters long'),
    age: zod.coerce.number('Age must be a number')
        .min(1, 'Age must be a positive number')
        .max(120, 'Age must be a valid human age'),
    placeOfBirth: zod.string()
        .trim()
        .regex(/^[A-Za-z0-9 ,]+$/, 'Place of birth must contain only English letters, numbers and spaces')
        .min(10, 'Place of birth must be at least 10 characters long'),
    imageURL: zod.url('Invalid image URL')
});

export const actorSchema = {
    create: actorCreateSchema
};