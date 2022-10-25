import { RequestHandler } from 'express';
import { IUserService } from '../interfaces/user.interfaces';

class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  login: RequestHandler = async (req, res, next) => {
    try {
      const { body } = req;
      const token = await this.userService.login(body);
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
