import { Router } from 'express';
import { furnitureSchema } from '../schemas/index.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { furnitureService } from '../services';

const furnitureController = Router();

furnitureController.get('/', async (req, res) => {
    const allFurnitureItems = await furnitureService.getAll();
    res.json(allFurnitureItems);
});

furnitureController.post('/', isAuth, async (req, res) => {
    const furnitureData = furnitureSchema.create.parse(req.body);
    const creatorId = req.user.id;

    await furnitureService.create(furnitureData, creatorId);
    res.status(201).json({ message: 'Furniture created' });
});

furnitureController.get('/:furnitureId', async (req, res) => {
    const furnitureId = req.params.furnitureId;
    
    const furnitureItem = await furnitureService.getById(furnitureId);
    if (!furnitureId) throw new Error('Cannot find furniture item.');

    res.json(furnitureItem);
});

export default furnitureController;