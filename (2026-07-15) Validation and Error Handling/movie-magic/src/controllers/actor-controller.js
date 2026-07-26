import { Router } from 'express';
import { actorService } from '../services/actor-service.js';
import { authGuard } from '../middlewares/auth-middleware.js';
import { actorSchema } from '../schemas/actor-schema.js';
import { getErrorMessages } from '../utils/error-utils.js';

const actorController = Router();

actorController.get('/create', authGuard.isAuth, (req, res) => {
    res.render('actors/create');
});

actorController.post('/create', authGuard.isAuth, async (req, res) => {
    try {
        const newActor = actorSchema.create.parse(req.body);
        await actorService.create(newActor);
    
        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessages(error);
        res.render('actors/create', {
            fieldErrorMessages: errorMessages.zodMessages,
            notificationErrorMessage: errorMessages.singleMessage,
            actorData: req.body
        });
    }
});

export default actorController;