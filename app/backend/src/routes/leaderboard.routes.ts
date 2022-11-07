import { Router } from 'express';
import { LeaderboardController } from '../controllers';
import { LeaderboardService } from '../database/models/services';

const leaderboardRouter = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get(
  '/home',
  leaderboardController.getAll,
);

export default leaderboardRouter;
