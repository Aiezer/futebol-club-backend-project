import { Op } from 'sequelize';
import { IMatch, IMatchUp } from '../entities/interfaces/IMatch';
import Matches from '../entities/Matches';
import Teams from '../entities/Teams';

export default class MatchesRepository {
  getAll = async (): Promise<IMatch[]> => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches as IMatch[];
  };

  getAllInProgress = async (query: string): Promise<IMatch[]> => {
    const matches = await Matches.findAll({
      where: { inProgress: JSON.parse(query) },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches as IMatch[];
  };

  createAMatch = async (newMatchRequest: IMatch) => {
    const newMatche = await Matches.create({
      ...newMatchRequest,
      inProgress: true,
    });

    return newMatche;
  };

  finishAMatch = async (id: string): Promise<void> => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  updateAMatch = async (id: string, matchUpdate: IMatchUp): Promise<void> => {
    const { homeTeamGoals, awayTeamGoals } = matchUpdate;

    await Matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  };

  getAllFinished = async () => {
    const matches = await Matches.findAll({
      where: { inProgress: 'false' },
    });
    return matches;
  };

  getAllMatchesByTeamId = async (id: number, inHome: boolean): Promise<IMatch[]> => {
    const whereQuery = inHome ? { homeTeam: id } : { awayTeam: id };
    const allTeamMatches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['id', 'inProgress', 'homeTeam', 'awayTeam'] },
      where: { inProgress: false, [Op.or]: [whereQuery] },
    });

    return allTeamMatches as IMatch[];
  };
}
