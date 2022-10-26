import { IMatch, IMatchService, IQuery } from '../interfaces/match.interface';
import Matche from '../database/models/matche';
import Team from '../database/models/team';

class MatchService implements IMatchService {
  constructor(private matchModel = Matche) {}

  async getAllMatches(inProgress?: IQuery): Promise<IMatch[] | []> {
    return this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      ...inProgress,
    });
  }
}

export default MatchService;
