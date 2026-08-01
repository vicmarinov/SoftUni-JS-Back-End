import { Router } from 'express';
import { userSchema } from '../schemas';
import { authService } from '../services';
import { isAuth, isGuest } from '../middlewares';

const authController = Router();

authController.post('/register', isGuest, async (req, res) => {
    const userData = userSchema.register.parse(req.body);
    const registrationResult = await authService.register(userData);
    res.status(201).json(registrationResult);
});

authController.post('/login', isGuest, async (req, res) => {
    const userData = userSchema.login.parse(req.body);
    const loginResult = await authService.login(userData);
    res.json(loginResult);
});

authController.get('/logout', isAuth, (req, res) => {
    res.json({ message: 'Logout successful' });
});

export default authController;