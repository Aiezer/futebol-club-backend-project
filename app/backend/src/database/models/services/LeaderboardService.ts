import ILeaderboard from '../entities/interfaces/ILeaderboard';
import TeamsRepository from '../repository/TeamsRepository';
import MatchesRepository from '../repository/MatchesRepository';
import ITeam from '../entities/interfaces/ITeam';
import { IMatch } from '../entities/interfaces/IMatch';
import LeaderboardHelper from '../../../helpers/LeaderboardHelper';

export default class LeaderboardService {
  constructor(
    private matchesRepository = new MatchesRepository(),
    private teamsRepository = new TeamsRepository(),
  ) {}

  getTeamsInfo = async (inHome: boolean): Promise<ILeaderboard[]> => {
    const allTeams = await this.teamsRepository.getAll();
    const allMatches = await this.matchesRepository.getAllFinished();

    const leaderboard = allTeams.map((team: ITeam) => {
      const filteredMatches = allMatches.filter((match: IMatch) =>
        (inHome ? match.homeTeam === team.id : match.awayTeam === team.id));

      return LeaderboardHelper.generateLeaderboard(team, filteredMatches, inHome);
    });
    return leaderboard;
  };
}
