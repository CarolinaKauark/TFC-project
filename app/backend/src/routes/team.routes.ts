import { Router } from 'express';
import TeamServices from '../services/team.service';
import Team from '../database/models/team';
import TeamController from '../controllers/team.controller';

const teamRouter = Router();
const teamService = new TeamServices(Team);
const teamController = new TeamController(teamService);

teamRouter.get('/', teamController.findAllTeams);
teamRouter.get('/:id', teamController.findById);

export default teamRouter;
