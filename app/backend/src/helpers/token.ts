import { verify, sign, JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import dotenv = require('dotenv');
import { IUser } from '../interfaces/user.interfaces';

dotenv.config();

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const generateToken = (user: Omit<IUser, 'password'>) => {
  const token = sign(
    { user },
    process.env.JWT_SECRET as Secret || 'secret',
    jwtConfig as SignOptions,
  );
  return token;
};

export const authenticate = (token: string): JwtPayload => {
  const decoded = verify(token, process.env.JWT_SECRET as Secret);
  return decoded as JwtPayload;
};
