import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserService } from '../interfaces/user.interfaces';

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  login: RequestHandler = async (req, res, next) => {
    try {
      const { body } = req;
      const token = await this.userService.login(body);
      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  };

  getRole: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.headers;
      const role = await this.userService.findById(userId as string);
      return res.status(StatusCodes.OK).json({ role });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
