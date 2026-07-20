import JSONWebToken from 'jsonwebtoken';

export function authMiddleware (req, res, next) {
    const authToken = req.cookies.authToken;

    if (!authToken) {
        next();
        return;
    }

    try {
        const user = JSONWebToken.verify(
            authToken,
            process.env.JSON_WEB_TOKEN_SECRET
        );

        req.user = user;
        res.locals.user = user;
        next();
    } catch (error) {
        res.clearCookie('authToken');
        res.redirect('/auth/login');
        return;
    }
}

export const authGuard = {
    isAuth (req, res, next) {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        next();
    },

    isGuest (req, res, next) {
        if (req.user) {
            res.redirect('/');
            return;
        }

        next();
    }
};