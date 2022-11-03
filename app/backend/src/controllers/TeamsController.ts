import { Request, Response } from 'express';
import { TeamsService } from '../database/models/services';

export default class TeamsController {
  constructor(private teamsService: TeamsService) {
    this.teamsService = teamsService;
  }

  getAll = async (req: Request, res: Response) => {
    const result = await this.teamsService.getAllTeams();

    return res.status(200).json(result);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamsService.getTeamById(id);

    return res.status(200).json(result);
  };
}
