import { Router } from 'express';
import { authService } from '../services/auth-service.js';
import { authGuard } from '../middlewares/auth-middleware.js';

const authController = Router();

authController.get('/register', authGuard.isGuest, (req, res) => {
    res.render('auth/register', { pageTitle: 'Register' });
});

authController.post('/register', authGuard.isGuest, async (req, res) => {
    const newUser = req.body;
    const authToken = await authService.register(
        newUser.email,
        newUser.password,
        newUser.repeatPassword
    );

    res.cookie('authToken', authToken);
    res.redirect('/');
});

export default authController;