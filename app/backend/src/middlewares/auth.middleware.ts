import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorGenerate from '../helpers/errorGenerate';
import { authenticate } from '../helpers/token';

const authorizationToken: RequestHandler = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new ErrorGenerate('Token not found', StatusCodes.UNAUTHORIZED);
  }

  try {
    const decoded = authenticate(authorization);
    req.headers.userId = decoded.id;

    next();
  } catch (err) {
    throw new ErrorGenerate('Invalid token', StatusCodes.UNAUTHORIZED);
  }
};

export default authorizationToken;
