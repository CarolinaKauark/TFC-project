import { Router } from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import userLoginMid from '../middlewares/login.middleware';
import User from '../database/models/user';
import authorizationToken from '../middlewares/auth.middleware';

const loginRouter = Router();
const userService = new UserService(User);
const userController = new UserController(userService);

loginRouter.post('/', userLoginMid, userController.login);

loginRouter.get('/validate', authorizationToken, userController.getRole);

export default loginRouter;
