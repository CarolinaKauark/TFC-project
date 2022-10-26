export interface IUser {
  email: string;
  password: string;
}

export interface IPayload extends IUser {
  id: number;
  role: string;
  email: string;
}

export type IRole = 'admin' | 'user';

export interface IUserService {
  login(body: IUser): Promise<string | void>;
  findById(id: string): Promise<IRole>;
}
