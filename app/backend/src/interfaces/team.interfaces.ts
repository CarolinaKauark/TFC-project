export interface ITeam {
  id?: number,
  teamName: string;
}

export interface ITeamService {
  findAllTeams(): Promise<ITeam[]>;
  findById(id: string): Promise<ITeam | null>;
}
