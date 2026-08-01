import { Router } from 'express';
import { furnitureSchema } from '../schemas/index.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { furnitureService } from '../services';

const furnitureController = Router();

furnitureController.get('/', async (req, res) => {
    const creatorId = new URLSearchParams(req.query.where)
        .get('_ownerId')
        ?.replaceAll(/["']/g, '');

    const allFurnitureItems = await furnitureService.getAll(creatorId);
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

furnitureController.put('/:furnitureId', isAuth, async (req, res) => {
    const furnitureId = req.params.furnitureId;
    const userId = req.user.id;

    const furnitureCreator = await furnitureService.getCreator(furnitureId);
    const isUserCreator = userId === furnitureCreator.id;
    if (!isUserCreator) return res.status(401).json({ message: 'Unauthorized' });

    const furnitureData = furnitureSchema.update.parse(req.body);

    await furnitureService.update(furnitureId, userId, furnitureData);
    res.json({ message: 'Furniture updated' });
});

furnitureController.delete('/:furnitureId', isAuth, async (req, res) => {
    const furnitureId = req.params.furnitureId;
    const userId = req.user.id;

    const furnitureCreator = await furnitureService.getCreator(furnitureId);
    const isUserCreator = userId === furnitureCreator.id;
    if (!isUserCreator) return res.status(401).json({ message: 'Unauthorized' });

    await furnitureService.remove(furnitureId, userId);
    res.json({ message: 'Furniture deleted' });
});

export default furnitureController;