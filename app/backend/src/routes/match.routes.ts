import { Router } from 'express';
import matchMiddleware from '../middlewares/match.middleware';
import Match from '../database/models/match';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const matchRoutes = Router();

const matchService = new MatchService(Match);
const matchController = new MatchController(matchService);

matchRoutes.post('/', matchMiddleware, matchController.insertMatch);
matchRoutes.get('/', matchController.getAllMatches);

export default matchRoutes;
