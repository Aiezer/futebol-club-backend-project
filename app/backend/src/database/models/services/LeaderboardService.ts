import ILeaderboard from '../entities/interfaces/ILeaderboard';
import TeamsRepository from '../repository/TeamsRepository';
import MatchesRepository from '../repository/MatchesRepository';
// import ITeam from '../entities/interfaces/ITeam';
// import { IMatch, IMatchInfo } from '../entities/interfaces/IMatch';
import LeaderboardHelper from '../../../helpers/LeaderboardHelper';

export default class LeaderboardService {
  constructor(
    private matchesRepository = new MatchesRepository(),
    private teamsRepository = new TeamsRepository(),
  ) {}

  getTeamsInfo = async (inHome: boolean): Promise<ILeaderboard[]> => {
    const allTeams = await this.teamsRepository.getAll();
    const allMatches = await this.matchesRepository.getAllFinished();

    const filteredTeams = LeaderboardHelper.filterTeams(allTeams, allMatches, inHome);

    const leaderboard = await Promise
      .all(filteredTeams.map(async ({ id, teamName }) => {
        const filteredMatches = await this.matchesRepository.getAllMatchesByTeamId(id, inHome);
        return LeaderboardHelper.generateLeaderboard(teamName, filteredMatches, inHome);
      }));
    return LeaderboardHelper.sortTeamStats(leaderboard);
  };

  getGeneralTeamsInfo = async () => {
    const allTeams = await this.teamsRepository.getAll();

    const leaderboard = await Promise
      .all(allTeams.map(async ({ id, teamName }): Promise<ILeaderboard> => {
        const inHomeMatches = await this.matchesRepository.getAllMatchesByTeamId(id, true);
        const inAwayMatches = await this.matchesRepository.getAllMatchesByTeamId(id, false);
        const teamStats = LeaderboardHelper.generalLeaderboard(
          teamName,
          inHomeMatches,
          inAwayMatches,
        );
        return teamStats;
      }));
    return LeaderboardHelper.sortTeamStats(leaderboard);
  };
}
