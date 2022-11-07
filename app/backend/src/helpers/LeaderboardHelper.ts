import ILeaderboard from '../database/models/entities/interfaces/ILeaderboard';
import ITeam from '../database/models/entities/interfaces/ITeam';
import { IGoals, IMatch, IMatchResults } from '../database/models/entities/interfaces/IMatch';

export default class LeaderboardHelper {
  static generateLeaderboard = (team: ITeam, matches: IMatch[]): ILeaderboard => {
    const { teamName } = team;
    const allGoals: IGoals = this.getGoals(matches);
    const matchResults: IMatchResults = this.getFinalMatchResults(matches);
    const totalPoints: number = this.handleTotalPoints(matchResults);
    const efficiency: number = this.handleTeamEfficiency(totalPoints, matchResults);
    return {
      name: teamName,
      ...allGoals,
      ...matchResults,
      totalPoints,
      efficiency,
    };
  };

  private static getGoals = (matches: IMatch[]): IGoals => {
    const homeTeamGoals = matches.map((match:IMatch) => match.homeTeamGoals);
    const awayTeamGoals = matches.map((match:IMatch) => match.awayTeamGoals);
    const goalsFavor = homeTeamGoals.reduce((acc: number, goals: number) => acc + goals);
    const goalsOwn = awayTeamGoals.reduce((acc: number, goals: number) => acc + goals);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  };

  private static getFinalMatchResults = (matches: IMatch[]): IMatchResults => {
    let totalVictories = 0;
    let totalLosses = 0;
    let totalDraws = 0;
    const totalGames = matches.length;

    matches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;
      if (homeTeamGoals > awayTeamGoals) totalVictories += 1;
      else if (homeTeamGoals < awayTeamGoals) totalLosses += 1;
      else totalDraws += 1;
    });

    return { totalVictories, totalLosses, totalDraws, totalGames };
  };

  private static handleTotalPoints = (matchResults:IMatchResults): number => {
    const { totalVictories, totalDraws } = matchResults;
    return totalVictories * 3 + totalDraws * 1;
  };

  private static handleTeamEfficiency = (
    totalPoints: number,
    matchResults: IMatchResults,
  ): number => {
    const { totalGames } = matchResults;
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  };
}

//   name: string,
//   totalPoints: number,
//   totalGames: number,
//   totalVictories: number,
//   totalDraws: number,
//   totalLosses: number,
//   goalsFavor: number,
//   goalsOwn: number,
//   goalsBalance: number,
//   efficiency: number