import { Router } from 'express';
import { missionService } from '../services/mission-service.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const recentMissions = await missionService.getRecent();
    res.render('home', { recentMissions });
});

export default homeController;