import { Router } from 'express';
import { userSchema } from '../schemas';
import { generateAuthToken, getErrorMessage } from '../utils';
import { authService } from '../services/index.js';

const authController = Router();

authController.post('/register', async (req, res) => {
    try {
        const userData = userSchema.register.parse(req.body);
        
        const user = await authService.register(userData);
        const authToken = generateAuthToken(user);

        res.json({
            accessToken: authToken,
            _id: user.id,
            email: user.email
        });
    } catch (error) {
        const message = getErrorMessage(error);
        res.status(400).json({ message });
    }
});

export default authController;