import { Request, Response } from 'express';
import { MatchesService } from '../database/models/services';

export default class MatchesController {
  constructor(private matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;

      if (inProgress) {
        const result = await this.matchesService.getAllMatchesInProgress(inProgress as string);
        return res.status(200).json(result);
      }

      const result = await this.matchesService.getAllMatches();
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  };
}
