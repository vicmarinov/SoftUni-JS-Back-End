import { Router } from 'express';
import { authSchema } from '../schemas/auth-schema.js';
import { getErrorMessage } from '../utils/error-utils.js';
import { authService } from '../services/auth-service.js';
import { isAuth, isGuest } from '../middlewares/auth-middleware.js';

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', isGuest, async (req, res) => {
    try {
        const userData = await authSchema.register.parseAsync(req.body);
        const authToken = await authService.register(userData);
        res.cookie('authToken', authToken, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render('auth/register', { errorMessage, userData: req.body });
    }
});

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

authController.post('/login', isGuest, async (req, res) => {
    try {
        const userData = await authSchema.login.parseAsync(req.body);
        const authToken = await authService.login(userData);
        res.cookie('authToken', authToken, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render('auth/login', { errorMessage, userData: req.body });
    }
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/');
});

export default authController;