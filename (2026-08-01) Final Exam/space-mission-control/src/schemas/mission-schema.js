import * as zod from 'zod';

export const DESTINATIONS_ENUM = [
    'Moon',
    'Mars',
    'Earth Orbit',
    'Jupiter',
    'Deep Space'
];

const create = zod.object({
    name: zod.string()
        .trim()
        .min(3, 'Mission name must be at least 3 characters long.'),
    type: zod.string()
        .trim()
        .min(5, 'Mission type must be at least 5 characters long.'),
    destination: zod.enum(
        DESTINATIONS_ENUM,
        `Destination must be one of the following: ${DESTINATIONS_ENUM.join(', ')}.`
    ),
    imageUrl: zod.httpUrl('Image URL must be a valid URL.'),
    crew: zod.coerce.number('Crew must be a number.')
        .nonnegative('Crew must be a non-negative number.'),
    launchDate: zod.string()
        .trim()
        .nonempty('Launch date is required.'),
    duration: zod.string()
        .trim()
        .min(2, 'Duration must be at least 2 characters long.'),
    description: zod.string()
        .trim()
        .min(10, 'Description must be at least 10 characters long.'),
});

const update = create;

export const missionSchema = {
    create,
    update,
};