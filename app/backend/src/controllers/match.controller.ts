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

  insertMatch: RequestHandler = async (req, res, next) => {
    try {
      const { body } = req;
      const newMatchId = await this.matchService.insertMatch({ ...body, inProgress: true });

      //   const newMatch = await this.matchService.findById(newMatchId);

      return res.status(201).json(newMatchId);
    } catch (error) {
      next(error);
    }
  };

  updateMatchInProgress: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.matchService.updateMatchInProgress(id as unknown as number);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
