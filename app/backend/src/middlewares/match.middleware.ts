import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorGenerate from '../helpers/errorGenerate';
import TeamServices from '../services/team.service';

const matchMiddleware: RequestHandler = async (req, _res, next) => {
  const teamService = new TeamServices();
  const { homeTeam, awayTeam } = req.body;
  const findHomeTeam = await teamService.findById(homeTeam);
  const findAwayTeam = await teamService.findById(awayTeam);

  if (!findHomeTeam || !findAwayTeam) {
    throw new ErrorGenerate('Team id invalid', StatusCodes.BAD_REQUEST);
  }

  next();
};

export default matchMiddleware;
