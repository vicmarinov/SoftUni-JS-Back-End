import { Router } from 'express';
import { missionService } from '../services/mission-service.js';

const publicRestAPIController = Router();

publicRestAPIController.get('/missions/latest', async (req, res) => {
    const missions = await missionService.getLatest();
    res.json(missions);
});

export default publicRestAPIController;