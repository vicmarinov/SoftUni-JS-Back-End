import { Router } from 'express';
import { furnitureSchema } from '../schemas/index.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { furnitureService } from '../services';
import { getErrorMessage } from '../utils';

const furnitureController = Router();

furnitureController.post('/', isAuth, async (req, res) => {
    try {
        const furnitureData = furnitureSchema.create.parse(req.body);
        const creatorId = req.user.id;

        await furnitureService.create(furnitureData, creatorId);
    } catch (error) {
        const message = getErrorMessage(error);
        res.status(400).json({ message });
    }
});

export default furnitureController;