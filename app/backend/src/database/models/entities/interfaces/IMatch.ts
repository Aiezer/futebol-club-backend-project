import Matches from '../Matches';

export interface IMatch extends Matches {
  teamHome?: { teamName: string };
  teamAway?: { teamName: string };
}

export interface IMatchUp extends IMatch{
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchInfo extends Matches {
  teamHome: { teamName: string },
  teamAway: { teamName: string },
}
