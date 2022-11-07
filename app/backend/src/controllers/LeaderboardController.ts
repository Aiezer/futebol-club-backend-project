import { Request, Response } from 'express';
import { LeaderboardService } from '../database/models/services';

export default class LeaderboardController {
  constructor(private leaderboarService: LeaderboardService) {
    this.leaderboarService = leaderboarService;
  }

  getAll = async (req: Request, res: Response) => {
    const result = await this.leaderboarService.getHomeTeamsInfo();
    return res.status(200).json(result);
  };
}
