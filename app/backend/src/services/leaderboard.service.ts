import { QueryTypes } from 'sequelize';
import { ILeaderboard, ILeaderboardService } from '../interfaces/leaderboards.interfaces';
import sequelizeModel from '../database/models';

const Query3 = (team1: string, team2: string) => `SELECT 
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

const Query1 = (query: string) => `SELECT *,
(totalVictories * 3 + totalDraws) AS totalPoints,
ROUND(((totalVictories * 3 + totalDraws) / (totalGames * 3) * 100), 2) AS efficiency
FROM (${query}) AS leaderboard
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

const Query2 = (queryHome: string, queryAway: string) => `SELECT
name,
SUM(goalsFavor) AS goalsFavor,
SUM(goalsOwn) AS goalsOwn,
SUM(goalsBalance) goalsBalance,
SUM(totalVictories) AS totalVictories,
SUM(totalLosses) AS totalLosses,
SUM(totalDraws) AS totalDraws,
SUM(totalGames) AS totalGames
FROM ((${queryHome}) UNION (${queryAway})) AS newBoard GROUP BY name`;

// `SELECT
// name,
// SUM(goalsFavor) AS goalsFavor,
// SUM(goalsOwn) AS goalsOwn,
// SUM(goalsBalance) goalsBalance,
// SUM(totalVictories) AS totalVictories,
// SUM(totalLosses) AS totalLosses,
// SUM(totalDraws) AS totalDraws,
// SUM(totalGames) AS totalGames
// FROM (
// ()
// UNION
// ()) AS leaderboard
// GROUP BY name`

// const testQuery = `SELECT *,
// (totalVictories * 3 + totalDraws) AS totalPoints,
// ROUND(((totalVictories * 3 + totalDraws) / (totalGames * 3) * 100), 2) AS efficiency
// FROM (
// SELECT
// name,
// SUM(goalsFavor) AS goalsFavor,
// SUM(goalsOwn) AS goalsOwn,
// SUM(goalsBalance) goalsBalance,
// SUM(totalVictories) AS totalVictories,
// SUM(totalLosses) AS totalLosses,
// SUM(totalDraws) AS totalDraws,
// SUM(totalGames) AS totalGames
// FROM (
// (SELECT
// te.team_name as name,
// SUM(home_team_goals) as goalsFavor,
// SUM(away_team_goals) AS goalsOwn,
// SUM(home_team_goals - away_team_goals) AS goalsBalance,
// SUM(home_team_goals > away_team_goals) AS totalVictories,
// SUM(home_team_goals < away_team_goals) AS totalLosses,
// SUM(home_team_goals = away_team_goals) AS totalDraws,
// COUNT(*) AS totalGames
// FROM TRYBE_FUTEBOL_CLUBE.matches as ma
// INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as te
// ON te.id = ma.home_team
// where in_progress = 0
// GROUP BY te.team_name)
// UNION
// (SELECT
// te.team_name as name,
// SUM(away_team_goals) as goalsFavor,
// SUM(home_team_goals) AS goalsOwn,
// SUM(away_team_goals - home_team_goals) AS goalsBalance,
// SUM(away_team_goals > home_team_goals) AS totalVictories,
// SUM(away_team_goals < home_team_goals) AS totalLosses,
// SUM(away_team_goals = home_team_goals) AS totalDraws,
// COUNT(*) AS totalGames
// FROM TRYBE_FUTEBOL_CLUBE.matches as ma
// INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as te
// ON te.id = ma.away_team
// where in_progress = 0
// GROUP BY te.team_name)) AS leaderboard
// GROUP BY name) AS newBoard
// ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;

// `;

class LeaderboardService implements ILeaderboardService {
  constructor(private modelSequelize = sequelizeModel) {}

  async getLeaderboard(team1: string, team2: string): Promise<ILeaderboard[]> {
    return this.modelSequelize.query(
      Query1(Query3(team1, team2)),
      { type: QueryTypes.SELECT },
    );
  }

  async getLeaderboardAll(): Promise<ILeaderboard[]> {
    return this.modelSequelize.query(
      Query1(Query2(Query3('home_team', 'away_Team'), Query3('away_Team', 'home_team'))),
      { type: QueryTypes.SELECT },
    );
  }
}

export default LeaderboardService;
