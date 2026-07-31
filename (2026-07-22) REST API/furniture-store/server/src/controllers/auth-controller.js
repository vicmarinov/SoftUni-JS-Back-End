import { Router } from 'express';
import { userSchema } from '../schemas';
import { getErrorMessage } from '../utils';
import { authService } from '../services/index.js';
import { isAuth, isGuest } from '../middlewares';

const authController = Router();

authController.post('/register', isGuest, async (req, res) => {
    try {
        const userData = userSchema.register.parse(req.body);
        const registrationResult = await authService.register(userData);
        res.json(registrationResult);
    } catch (error) {
        const message = getErrorMessage(error);
        res.status(400).json({ message });
    }
});

authController.post('/login', isGuest, async (req, res) => {
    try {
        const userData = userSchema.login.parse(req.body);
        const loginResult = await authService.login(userData);
        res.json(loginResult);
    } catch (error) {
        const message = getErrorMessage(error);
        res.status(400).json({ message });
    }
});

authController.get('/logout', isAuth, (req, res) => {
    res.json({ message: 'Logout successful' });
});

export default authController;