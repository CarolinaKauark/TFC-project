import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardService } from '../interfaces/leaderboards.interfaces';

class LeaderboardController {
  constructor(private service: ILeaderboardService) {}

  getLeaderboardHome: RequestHandler = async (req, res, next) => {
    try {
      const leaderboardHomeTime = await this.service.getLeaderboard('home_team', 'away_Team');
      return res.status(StatusCodes.OK).json(leaderboardHomeTime);
    } catch (error) {
      next(error);
    }
  };

  getLeaderboardAway: RequestHandler = async (req, res, next) => {
    try {
      const leaderboardHomeTime = await this.service.getLeaderboard('away_Team', 'home_team');
      return res.status(StatusCodes.OK).json(leaderboardHomeTime);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderboardController;
