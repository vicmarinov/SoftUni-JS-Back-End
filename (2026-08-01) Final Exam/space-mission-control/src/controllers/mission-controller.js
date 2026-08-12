import { Router } from 'express';
import { isAuth } from '../middlewares/auth-middleware.js';
import { DESTINATIONS_ENUM, missionSchema } from '../schemas/mission-schema.js';
import { getErrorMessage } from '../utils/error-utils.js';
import { missionService } from '../services/mission-service.js';

const missionController = Router();

missionController.get('/', async (req, res) => {
    const missions = await missionService.getAll();
    res.render('missions/dashboard', { missions });
});

missionController.get('/add', isAuth, (req, res) => {
    const destinations = DESTINATIONS_ENUM
        .map(destination => ({ name: destination }));
    
    res.render('missions/add', { destinations });
});

missionController.post('/add', isAuth, async (req, res) => {
    try {
        const missionData = missionSchema.create.parse(req.body);
        const userId = req.user.id;

        await missionService.create(missionData, userId);
        res.redirect('/missions');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        const destinations = DESTINATIONS_ENUM
            .map(destination => ({
                name: destination,
                isSelected: destination === req.body.destination
            }));
        
        res.render('missions/add', { destinations, errorMessage, missionData: req.body });
    }
});

missionController.get('/:missionId/support', isAuth, async (req, res) => {
    const missionId = req.params.missionId;
    const missionData = await missionService.getById(missionId);
    if (!missionData) return res.redirect('/missions');

    const userId = req.user?.id;
    const isOwner = userId && missionData.ownerId === userId;
    const canSupport = userId &&
        !isOwner &&
        !missionData.supportList
            .some(supporter => supporter.id === userId);
    
    if (!canSupport) return res.redirect(`/missions/${missionId}`);

    await missionService.support(missionId, userId);
    res.redirect(`/missions/${missionId}`);
});

missionController.get('/:missionId/edit', isAuth, async (req, res) => {
    const missionId = req.params.missionId;
    const missionData = await missionService.getById(missionId);
    if (!missionData) return res.redirect(`/missions`);

    const userId = req.user?.id;
    const isOwner = userId && missionData.ownerId === userId;
    if (!isOwner) return res.redirect(`/missions/${missionId}`);

    const destinations = DESTINATIONS_ENUM
        .map(destination => ({
            name: destination,
            isSelected: destination === missionData.destination
        }));

    res.render('missions/edit', { missionData, destinations });
});

missionController.post('/:missionId/edit', isAuth, async (req, res) => {
    try {
        const missionId = req.params.missionId;
        const missionOwner = await missionService.getOwnerById(missionId);
        if (!missionOwner) return res.redirect(`/missions/${missionId}`);

        const userId = req.user?.id;
        const isOwner = userId && missionOwner.id === userId;
        if (!isOwner) return res.redirect(`/missions/${missionId}`);

        const missionData = missionSchema.update.parse(req.body);

        await missionService.edit(missionId, userId, missionData);
        res.redirect(`/missions/${missionId}`);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        const destinations = DESTINATIONS_ENUM
            .map(destination => ({
                name: destination,
                isSelected: destination === req.body.destination
            }));

        res.render('missions/add', { destinations, errorMessage, missionData: req.body });
    }
});

missionController.get('/:missionId/delete', isAuth, async (req, res) => {
    const missionId = req.params.missionId;
    const missionOwner = await missionService.getOwnerById(missionId);
    if (!missionOwner) return res.redirect(`/missions/${missionId}`);

    const userId = req.user?.id;
    const isOwner = userId && missionOwner.id === userId;
    if (!isOwner) return res.redirect(`/missions/${missionId}`);

    await missionService.remove(missionId, userId);
    res.redirect('/missions');
});

missionController.get('/:missionId', async (req, res) => {
    const missionId = req.params.missionId;
    const missionData = await missionService.getById(missionId);
    if (!missionData) return res.redirect('/missions');

    const userId = req.user?.id;
    const isOwner = userId && missionData.ownerId === userId;
    const canSupport = userId &&
        !isOwner &&
        !missionData.supportList
            .some(supporter => supporter.id === userId);

    res.render('missions/details', { missionData, isOwner, canSupport });
});

export default missionController;