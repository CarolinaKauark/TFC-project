import { ITeam } from './team.interfaces';

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}

export interface IMatchService {
  getAllMatches(): Promise<IMatch[] | []>
}
