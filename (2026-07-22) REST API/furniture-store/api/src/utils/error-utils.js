import * as zod from 'zod';

export function getErrorMessage (error) {
    if (error instanceof zod.ZodError) {
        return Object.values(zod.flattenError(error).fieldErrors)
            .flat()
            .join(' ') || 'Invalid input';
    }

    return error.message || 'An unknown error occurred';
}