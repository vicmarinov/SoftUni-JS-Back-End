import * as zod from 'zod';

export function getErrorMessage (error) {
    let message = 'An unknown error occurred.';

    if (error instanceof zod.ZodError) {
        const errors = zod.flattenError(error).fieldErrors;
        message = Object.values(errors).flat().join(' ') || 'Invalid input';
    } else if (error.name === 'PrismaClientKnownRequestError') {
        switch (error.code) {
            case 'P2002':
                message = 'Unique constraint failed. The provided value already exists in the database.';
                break;
            case 'P2003':
                message = 'Foreign key constraint failed. The referenced record does not exist.';
                break;
            default:
                message = 'Database error occurred.';
        }
    } else {
        if (error.message) {
            message = error.message;
        }
    }

    return message;
}