import JSONWebToken from 'jsonwebtoken';

export function authMiddleware (req, res, next) {
    const authToken = req.header('X-Authorization');
    if (!authToken) return next();

    try {
        const secret = process.env.JSON_WEB_TOKEN_SECRET;
        const user = JSONWebToken.verify(authToken, secret);
        req.user = user;
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }

    next();
}

export function isAuth (req, res, next) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    next();
}

export function isGuest (req, res, next) {
    if (req.user) return res.status(401).json({ error: 'Unauthorized' });
    next();
}