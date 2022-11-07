import Matches from '../Matches';

export interface IMatch extends Matches {
  teamHome?: { teamName: string };
  teamAway?: { teamName: string };
}

export interface IMatchUp extends IMatch{
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchResults {
  totalVictories: number
  totalLosses: number
  totalDraws: number
  totalGames: number
}

export interface IGoals {
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
}
