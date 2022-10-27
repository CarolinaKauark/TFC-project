import { IMatch, IMatchService, IQuery } from '../interfaces/match.interface';
import Match from '../database/models/match';
import Team from '../database/models/team';

class MatchService implements IMatchService {
  constructor(private matchModel = Match) {}

  async getAllMatches(inProgress?: IQuery): Promise<IMatch[] | []> {
    return this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      ...inProgress,
    });
  }

  async insertMatch(match: IMatch): Promise<any> {
    return this.matchModel.create(match);
  }

  async findById(id: number): Promise<IMatch | null> {
    return this.matchModel.findByPk(id);
  }
}

export default MatchService;
