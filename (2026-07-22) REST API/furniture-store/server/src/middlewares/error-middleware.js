import { getErrorMessage } from '../utils';

export function errorMiddleware (error, req, res, next) {
    const message = getErrorMessage(error);
    res.status(400).json({ message });
}