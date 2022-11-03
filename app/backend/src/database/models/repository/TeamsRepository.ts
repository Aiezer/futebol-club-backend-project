import ITeam from '../entities/interfaces/ITeam';
import Teams from '../entities/Teams';

export default class TeamsRepository {
  getAll = async (): Promise<ITeam[]> => {
    const teams = await Teams.findAll();
    return teams;
  };

  getById = async (id: string): Promise<ITeam | null> => {
    const team = await Teams.findByPk(id);
    return team;
  };
}
