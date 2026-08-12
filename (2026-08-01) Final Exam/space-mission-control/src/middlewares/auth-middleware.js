import JSONWebToken from 'jsonwebtoken';

export function authMiddleware (req, res, next) {
    const authToken = req.cookies.authToken;
    if (!authToken) return next();

    try {
        const secret = process.env.JSON_WEB_TOKEN_SECRET || 'default_secret';
        const user = JSONWebToken.verify(authToken, secret);
        
        req.user = user;
        res.locals.user = {
            ...user,
            initial: user.email.charAt(0).toUpperCase()
        };
        
        next();
    } catch (error) {
        res.clearCookie('authToken');
        res.redirect('/auth/login');
    }
}

export function isAuth (req, res, next) {
    if (!req.user) return res.redirect('/auth/login');
    next();
}

export function isGuest (req, res, next) {
    if (req.user) return res.redirect('/');
    next();
}