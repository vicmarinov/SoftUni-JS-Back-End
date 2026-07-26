import { Router } from 'express';
import { actorService } from '../services/actor-service.js';
import { authGuard } from '../middlewares/auth-middleware.js';

const actorController = Router();

actorController.get('/create', authGuard.isAuth, (req, res) => {
    res.render('actors/create', { pageTitle: 'Add Actor Information' });
});

actorController.post('/create', authGuard.isAuth, async (req, res) => {
    const newActor = req.body;
    await actorService.create(newActor);

    res.redirect('/');
});

export default actorController;