import * as zod from 'zod';

export function getErrorMessages (error) {
    const messages = {};

    if (error instanceof zod.ZodError) {
        messages.zodMessages = zod.flattenError(error).fieldErrors;
    } else {
        messages.singleMessage = error.message || 'An unexpected error occurred';
    }

    return messages;
}