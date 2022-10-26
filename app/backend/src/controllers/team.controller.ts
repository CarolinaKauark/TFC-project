import { RequestHandler } from 'express';
import { ITeamService } from '../interfaces/team.interfaces';

class TeamController {
  private teamService: ITeamService;

  constructor(teamService: ITeamService) {
    this.teamService = teamService;
  }

  findAllTeams: RequestHandler = async (req, res, next) => {
    try {
      const allTeams = await this.teamService.findAllTeams();
      return res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  };

  findById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const team = await this.teamService.findById(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
