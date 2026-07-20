import { Router } from 'express';
import { actorService } from '../services/actor-service.js';

const actorController = Router();

actorController.get('/create', (req, res) => {
    res.render('actors/create', { pageTitle: 'Add Actor Information' });
});

actorController.post('/create', async (req, res) => {
    const newActor = req.body;
    await actorService.create(
        newActor.name,
        newActor.age,
        newActor.placeOfBirth,
        newActor.imageURL
    );

    res.redirect('/');
});

export default actorController;