import { Router } from 'express';
import { authService } from '../services/auth-service.js';
import { authGuard } from '../middlewares/auth-middleware.js';

const authController = Router();

authController.get('/register', authGuard.isGuest, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', authGuard.isGuest, async (req, res) => {
    const newUser = req.body;
    const authToken = await authService.register(newUser);
    res.cookie('authToken', authToken);
    res.redirect('/');
});

authController.get('/login', authGuard.isGuest, (req, res) => {
    res.render('auth/login');
});

authController.post('/login', authGuard.isGuest, async (req, res) => {
    const userData = req.body;
    const authToken = await authService.login(userData);
    res.cookie('authToken', authToken);
    res.redirect('/');
});

authController.get('/logout', authGuard.isAuth, (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/');
});

export default authController;