import { Router } from 'express';
import Matche from '../database/models/matche';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const matchRoutes = Router();

const matchService = new MatchService(Matche);
const matchController = new MatchController(matchService);

matchRoutes.get('/', matchController.getAllMatches);

export default matchRoutes;
