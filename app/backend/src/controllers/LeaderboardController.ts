import { Request, Response } from 'express';
import { LeaderboardService } from '../database/models/services';

export default class LeaderboardController {
  constructor(private leaderboarService: LeaderboardService) {
    this.leaderboarService = leaderboarService;
  }

  getAllInHome = async (req: Request, res: Response) => {
    // the getTeamsInfo function expects a bool (called be 'inHome'):
    // false (to return results from away matches) or
    // true (to return results from home matches)
    const result = await this.leaderboarService.getTeamsInfo(true);
    return res.status(200).json(result);
  };

  getAllInAway = async (req: Request, res: Response) => {
    const result = await this.leaderboarService.getTeamsInfo(false);
    return res.status(200).json(result);
  };

  getAll = async (req: Request, res: Response) => {
    const result = await this.leaderboarService.getGeneralTeamsInfo();
    return res.status(200).json(result);
  };
}
