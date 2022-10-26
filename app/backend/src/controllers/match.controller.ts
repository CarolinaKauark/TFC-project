import { RequestHandler } from 'express';
import { IMatchService } from '../interfaces/match.interface';

class MatchController {
  constructor(private matchService: IMatchService) {}

  getAllMatches: RequestHandler = async (req, res, next) => {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        const matches = await this.matchService.getAllMatches();
        return res.status(200).json(matches);
      }
      const bool = inProgress === 'true';
      const matches = await this.matchService.getAllMatches({ where: { inProgress: bool } });
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
