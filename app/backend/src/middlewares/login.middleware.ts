import { NextFunction, Request, Response } from 'express';
import ErrorGenerate from '../helpers/errorGenerate';
import statusCodes from '../helpers/statusCode';

const userLoginMid = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorGenerate('All fields must be filled', statusCodes.badRequest);
  }
  if (password.length <= 6) {
    throw new ErrorGenerate('All fields must be filled', statusCodes.badRequest);
  }

  next();
};

export default userLoginMid;
