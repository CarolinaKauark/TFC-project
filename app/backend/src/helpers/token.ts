import { verify, sign, JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';
import { IPayload } from '../interfaces/user.interfaces';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const generateToken = (user: Omit<IPayload, 'password'>) => {
  console.log('USER', user);

  const token = sign(
    user,
    process.env.JWT_SECRET || 'secret',
    jwtConfig as SignOptions,
  );
  return token;
};

export const authenticate = (token: string): JwtPayload => {
  const decoded = verify(token, process.env.JWT_SECRET as Secret);
  return decoded as JwtPayload;
};
