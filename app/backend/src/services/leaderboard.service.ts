import { QueryTypes } from 'sequelize';
import { ILeaderboard, ILeaderboardService } from '../interfaces/leaderboards.interfaces';
import sequelizeModel from '../database/models';

const leaderboardQuery2 = (team1: string, team2: string) => `SELECT 
te.team_name as name, 
SUM(${team1}_goals) as goalsFavor, 
SUM(${team2}_goals) AS goalsOwn, 
SUM(${team1}_goals - ${team2}_goals) AS goalsBalance,
SUM(${team1}_goals > ${team2}_goals) AS totalVictories,
SUM(${team1}_goals < ${team2}_goals) AS totalLosses,
SUM(${team1}_goals = ${team2}_goals) AS totalDraws, 
COUNT(*) AS totalGames      
FROM TRYBE_FUTEBOL_CLUBE.matches as ma
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as te
ON te.id = ma.${team1}
where in_progress = 0
GROUP BY te.team_name`;

const leaderboardQuery1 = (query: string) => `SELECT *,
(totalVictories * 3 + totalDraws) AS totalPoints,
ROUND(((totalVictories * 3 + totalDraws) / (totalGames * 3) * 100), 2) AS efficiency
FROM (${query}) AS leaderboard
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

class LeaderboardService implements ILeaderboardService {
  constructor(private modelSequelize = sequelizeModel) {}

  async getLeaderboard(team1: string, team2: string): Promise<ILeaderboard[]> {
    return this.modelSequelize.query(
      leaderboardQuery1(leaderboardQuery2(team1, team2)),
      { type: QueryTypes.SELECT },
    );
  }
}

export default LeaderboardService;
