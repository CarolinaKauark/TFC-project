import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorGenerate from '../helpers/errorGenerate';
import TeamServices from '../services/team.service';

const matchMiddleware: RequestHandler = async (req, _res, next) => {
  const teamService = new TeamServices();
  const { homeTeam, awayTeam } = req.body;
  const findHomeTeam = await teamService.findById(homeTeam);
  const findAwayTeam = await teamService.findById(awayTeam);

  if (homeTeam === awayTeam) {
    next(new ErrorGenerate(
      'It is not possible to create a match with two equal teams',
      StatusCodes.UNPROCESSABLE_ENTITY,
    ));
  }

  if (!findHomeTeam || !findAwayTeam) {
    next(new ErrorGenerate('There is no team with such id!', StatusCodes.NOT_FOUND));
  }

  next();
};

export default matchMiddleware;
