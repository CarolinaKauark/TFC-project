import { Router } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderRoute = Router();
const leaboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaboardService);

leaderRoute.get('/home', leaderboardController.getLeaderboardHome);
leaderRoute.get('/away', leaderboardController.getLeaderboardAway);

export default leaderRoute;
