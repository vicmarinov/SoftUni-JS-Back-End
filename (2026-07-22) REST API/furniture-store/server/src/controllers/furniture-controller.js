import { Router } from 'express';
import { furnitureSchema } from '../schemas/index.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { furnitureService } from '../services';

const furnitureController = Router();

furnitureController.post('/', isAuth, async (req, res) => {
    const furnitureData = furnitureSchema.create.parse(req.body);
    const creatorId = req.user.id;

    await furnitureService.create(furnitureData, creatorId);
});

export default furnitureController;