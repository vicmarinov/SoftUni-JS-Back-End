import { Router } from 'express';
import { userSchema } from '../schemas';
import { getErrorMessage } from '../utils';
import { authService } from '../services/index.js';

const authController = Router();

authController.post('/register', async (req, res) => {
    try {
        const userData = userSchema.register.parse(req.body);
        const registrationResult = await authService.register(userData);
        res.json(registrationResult);
    } catch (error) {
        const message = getErrorMessage(error);
        res.status(400).json({ message });
    }
});

authController.post('/login', async (req, res) => {
    try {
        const userData = userSchema.login.parse(req.body);
        const loginResult = await authService.login(userData);
        res.json(loginResult);
    } catch (error) {
        const message = getErrorMessage(error);
        res.status(400).json({ message });
    }
});

export default authController;