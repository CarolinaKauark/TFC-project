import { IMatch, IMatchService } from '../interfaces/match.interface';
import Matche from '../database/models/matche';
import Team from '../database/models/team';

class MatchService implements IMatchService {
  constructor(private matchModel = Matche) {}

  async getAllMatches(): Promise<IMatch[] | []> {
    return this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
  }
}

export default MatchService;
