import { Router } from 'express';
import { LeaderboardController } from '../controllers';
import { LeaderboardService } from '../database/models/services';

const leaderboardRouter = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/', leaderboardController.getAll);
leaderboardRouter.get('/home', leaderboardController.getAllInHome);
leaderboardRouter.get('/away', leaderboardController.getAllInAway);

export default leaderboardRouter;
