import { ITeamService, ITeam } from '../interfaces/team.interfaces';
import Team from '../database/models/team';

class TeamServices implements ITeamService {
  constructor(private teamModel = Team) {}

  async findAllTeams(): Promise<ITeam[]> {
    return this.teamModel.findAll();
  }

  async findById(id: string): Promise<ITeam | null> {
    return this.teamModel.findByPk(id);
  }
}

export default TeamServices;
