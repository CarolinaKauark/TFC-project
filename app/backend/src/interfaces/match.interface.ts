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
}

export interface IQuery {
  where: { inProgress: boolean }
}
