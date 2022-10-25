export interface IUser {
  email: string;
  password: string;
}

export interface IUserService {
  login(body: IUser): Promise<string | void>;
}
