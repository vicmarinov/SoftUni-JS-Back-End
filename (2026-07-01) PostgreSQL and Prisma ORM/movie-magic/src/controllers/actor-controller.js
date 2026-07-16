import { Router } from 'express';

const actorController = Router();

actorController.get('/create', (req, res) => {
    res.render('actors/create', { pageTitle: 'Add Actor Information' });
});

export default actorController;