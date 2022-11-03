import ITeam from '../entities/interfaces/ITeam';
import TeamsRepository from '../repository/TeamsRepository';

export default class TeamsService {
  constructor(private teamsRepository = new TeamsRepository()) {}
  getAllTeams = async ():Promise<ITeam[]> => this.teamsRepository.getAll();

  getTeamById = async (id:string) => this.teamsRepository.getById(id);
}
