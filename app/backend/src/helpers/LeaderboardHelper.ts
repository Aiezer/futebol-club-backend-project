import Matches from '../database/models/entities/Matches';
import ILeaderboard from '../database/models/entities/interfaces/ILeaderboard';
import ITeam from '../database/models/entities/interfaces/ITeam';
import {
  IGoals,
  IMatch,
  IMatchResults,
} from '../database/models/entities/interfaces/IMatch';

export default class LeaderboardHelper {
  static generateLeaderboard = (teamName: string, matches: IMatch[], inHome: boolean) => {
    const allGoals: IGoals = this.getGoals(matches, inHome);
    const matchResults: IMatchResults = this.getFinalMatchResults(
      matches,
      inHome,
    );
    const totalPoints: number = this.handleTotalPoints(matchResults);
    const efficiency: number = this.handleTeamEfficiency(
      totalPoints,
      matchResults,
    );
    return {
      name: teamName,
      ...allGoals,
      ...matchResults,
      totalPoints,
      efficiency,
    };
  };

  public static generalLeaderboard = (
    teamName: string,
    inHomeMatches: IMatch[],
    inAwayMatches: IMatch[],
  ) => {
    const inHomeResults = this.generateLeaderboard(teamName, inHomeMatches, true);
    const inAwayResults = this.generateLeaderboard(teamName, inAwayMatches, false);
    const generalLeaderboard = this.merge(teamName, inHomeResults, inAwayResults);
    return generalLeaderboard;
  };

  private static merge = (teamName: string, inHome:ILeaderboard, inAway:ILeaderboard) => {
    const totalVictories = inHome.totalVictories + inAway.totalVictories;
    const totalDraws = inHome.totalDraws + inAway.totalDraws;
    const totalGames = inHome.totalGames + inAway.totalGames;
    const totalPoints = totalVictories * 3 + totalDraws * 1;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    return {
      name: teamName,
      goalsFavor: inHome.goalsFavor + inAway.goalsFavor,
      goalsOwn: inHome.goalsOwn + inAway.goalsOwn,
      goalsBalance: inHome.goalsBalance + inAway.goalsBalance,
      totalVictories,
      totalLosses: inHome.totalLosses + inAway.totalLosses,
      totalDraws,
      totalGames,
      totalPoints,
      efficiency,
    };
  };

  static sortTeamStats(allMatches: ILeaderboard[]): ILeaderboard[] {
    return allMatches.sort((a: ILeaderboard, b: ILeaderboard) => {
      if (a.totalPoints < b.totalPoints) { return 1; }
      if (a.totalPoints > b.totalPoints) { return -1; }
      if (a.totalVictories < b.totalVictories) { return 1; }
      if (a.totalVictories > b.totalVictories) { return -1; }
      if (a.goalsBalance < b.goalsBalance) { return 1; }
      if (a.goalsBalance > b.goalsBalance) { return -1; }
      if (a.goalsFavor < b.goalsFavor) { return 1; }
      if (a.goalsFavor > b.goalsFavor) { return -1; }
      if (a.goalsOwn < b.goalsOwn) { return 1; }
      if (a.goalsOwn > b.goalsOwn) { return -1; }
      return 0;
    });
  }

  public static filterTeams = (
    allTeams: ITeam[],
    allMatches: Matches[],
    inHome: boolean,
  ): ITeam[] =>
    allTeams.filter((team: ITeam) => {
      const filteredMatches = allMatches.filter((match: Matches) =>
        (inHome ? match.homeTeam === team.id : match.awayTeam === team.id));
      return filteredMatches.length > 0 && team;
    });

  private static getGoals = (matches: IMatch[], inHome: boolean): IGoals => {
    const homeTeamGoals = matches.map((match: IMatch) => match.homeTeamGoals);
    const awayTeamGoals = matches.map((match: IMatch) => match.awayTeamGoals);
    const goalsFavor = inHome
      ? homeTeamGoals.reduce((acc: number, goals: number) => acc + goals)
      : awayTeamGoals.reduce((acc: number, goals: number) => acc + goals);

    const goalsOwn = inHome
      ? awayTeamGoals.reduce((acc: number, goals: number) => acc + goals)
      : homeTeamGoals.reduce((acc: number, goals: number) => acc + goals);
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  };

  private static getFinalMatchResults = (matches: IMatch[], inHome: boolean): IMatchResults => {
    let totalVictories = 0;
    let totalLosses = 0;
    let totalDraws = 0;
    const totalGames = matches.length;

    matches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;

      if (inHome) {
        if (homeTeamGoals > awayTeamGoals) totalVictories += 1;
        else if (homeTeamGoals < awayTeamGoals) totalLosses += 1;
        else totalDraws += 1;
      }

      if (homeTeamGoals < awayTeamGoals) totalVictories += 1;
      else if (homeTeamGoals > awayTeamGoals) totalLosses += 1;
      else totalDraws += 1;
    });

    return { totalVictories, totalLosses, totalDraws, totalGames };
  };

  private static handleTotalPoints = (matchResults: IMatchResults): number => {
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
