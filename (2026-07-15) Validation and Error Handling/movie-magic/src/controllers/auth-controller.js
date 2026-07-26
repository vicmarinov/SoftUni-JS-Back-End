import { Router } from 'express';
import { authService } from '../services/auth-service.js';
import { authGuard } from '../middlewares/auth-middleware.js';
import { userSchema } from '../schemas/user-schema.js';
import { getErrorMessages } from '../utils/error-utils.js';

const authController = Router();

authController.get('/register', authGuard.isGuest, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', authGuard.isGuest, async (req, res) => {
    try {
        const newUserData = userSchema.register.parse(req.body);
        const authToken = await authService.register(newUserData);
        res.cookie('authToken', authToken);
        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessages(error);
        res.render('auth/register', {
            fieldErrorMessages: errorMessages.zodMessages,
            notificationErrorMessage: errorMessages.singleMessage,
            userData: req.body
        });
    }
});

authController.get('/login', authGuard.isGuest, (req, res) => {
    res.render('auth/login');
});

authController.post('/login', authGuard.isGuest, async (req, res) => {
    try {
        const userData = userSchema.login.parse(req.body);
        const authToken = await authService.login(userData);
        res.cookie('authToken', authToken);
        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessages(error);
        res.render('auth/login', {
            fieldErrorMessages: errorMessages.zodMessages,
            notificationErrorMessage: errorMessages.singleMessage,
            userData: req.body
        });
    }
});

authController.get('/logout', authGuard.isAuth, (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/');
});

export default authController;