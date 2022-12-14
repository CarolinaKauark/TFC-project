import { Router } from 'express';
import matchMiddleware from '../middlewares/match.middleware';
import Match from '../database/models/match';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import authorizationToken from '../middlewares/auth.middleware';

const matchRoutes = Router();

const matchService = new MatchService(Match);
const matchController = new MatchController(matchService);

matchRoutes.patch('/:id/finish', matchController.updateMatchInProgress);
matchRoutes.patch('/:id', matchController.updateMatch);
matchRoutes.post('/', authorizationToken, matchMiddleware, matchController.insertMatch);
matchRoutes.get('/', matchController.getAllMatches);

export default matchRoutes;
