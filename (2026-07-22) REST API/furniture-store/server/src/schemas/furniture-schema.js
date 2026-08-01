import * as zod from 'zod';

export const create = zod.object({
    make: zod.string('Make is required.')
        .min(4, 'Make must be at least 4 characters long.'),
    model: zod.string('Model is required.')
        .min(4, 'Model must be at least 4 characters long.'),
    year: zod.coerce.number('Year is required.')
        .min(1950, 'Year must be at least 1950.')
        .max(new Date().getFullYear(), 'Year cannot be in the future.'),
    description: zod.string('Description is required.')
        .min(10, 'Description must be at least 10 characters long.'),
    price: zod.coerce.number('Price is required.')
        .positive('Price must be a positive number.'),
    img: zod.httpUrl('Image URL is required.'),
    material: zod.string()
        .optional()
}).transform(data => ({ imageURL: data.img, ...data }));

export const update = create;