import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../helpers/token';
import { IUser, IUserService } from '../interfaces/user.interfaces';
import User from '../database/models/user';
import ErrorGenerate from '../helpers/errorGenerate';
import { checkPassword } from '../helpers/bcrypt';

class UserService implements IUserService {
  constructor(private userModel = User) {}

  async login(body: IUser): Promise<string> {
    const user = await this.userModel.findOne({ where: { email: body.email } });
    console.log(user);

    if (!user || !checkPassword(body.password, user.password)) {
      throw new ErrorGenerate('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    }

    const { email, id, role } = user;
    const token = generateToken({ email, id, role });
    return token;
  }
}

export default UserService;
