import * as zod from 'zod';

export const MOVIE_CATEGORIES = {
    "tv-show": "TV Show",
    "animation": "Animation",
    "movie": "Movie",
    "documentary": "Documentary",
    "short-film": "Short Film"
};

const movieCreateOrEditSchema = zod.object({
    title: zod.string()
        .trim()
        .regex(/^[A-Za-z0-9 ]+$/, 'Title must contain only English letters, numbers and spaces')
        .min(5, 'Title must be at least 5 characters long'),
    category: zod.enum(Object.keys(MOVIE_CATEGORIES), 'Category must be one of the ones in the list')
        .transform(categoryCode => MOVIE_CATEGORIES[categoryCode]),
    genre: zod.string()
        .trim()
        .regex(/^[A-Za-z0-9 ]+$/, 'Genre must contain only English letters, numbers and spaces')
        .min(5, 'Genre must be at least 5 characters long'),
    director: zod.string()
        .trim()
        .regex(/^[A-Za-z0-9 ]+$/, 'Director must contain only English letters, numbers and spaces')
        .min(5, 'Director must be at least 5 characters long'),
    year: zod.coerce.number('Year must be a number')
        .min(1900, 'Year must be a valid year')
        .max(new Date().getFullYear(), 'Year must be a valid year'),
    imageURL: zod.url('Invalid image URL'),
    rating: zod.coerce.number('Rating must be a number')
        .min(1, 'Rating must be minimum 1')
        .max(5, 'Rating must be maximum 5'),
    description: zod.string()
        .trim()
        .regex(/^[A-Za-z0-9 ]+$/, 'Description must contain only English letters, numbers and spaces')
        .min(20, 'Description must be at least 20 characters long')
});

export const movieSchema = {
    create: movieCreateOrEditSchema,
    edit: movieCreateOrEditSchema
};