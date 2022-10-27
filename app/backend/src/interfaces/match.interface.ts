import { ITeam } from './team.interfaces';

export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}

export interface IMatchService {
  getAllMatches(inProgress?: IQuery): Promise<IMatch[] | []>;
  insertMatch(match: IMatch): Promise<number>;
  findById(id: number): Promise<IMatch | null>;
  updateMatchInProgress(id: number): Promise<void>;
  updateMatch(match: IGoals, id: number): Promise<void>;
}

export interface IQuery {
  where: { inProgress: boolean }
}

export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number
}
