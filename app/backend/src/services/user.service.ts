import { generateToken } from '../helpers/token';
import { IUser, IUserService } from '../interfaces/user.interfaces';
import User from '../database/models/user';
import ErrorGenerate from '../helpers/errorGenerate';
import statusCodes from '../helpers/statusCode';
import checkPassword from '../helpers/bcrypt';

class UserService implements IUserService {
  constructor(private userModel = User) {}

  async login(body: IUser): Promise<string | void> {
    const user = await this.userModel.findOne({ where: { email: body.email } });
    if (!user) throw new ErrorGenerate('Incorrect email or password', statusCodes.unauthorized);
    const success = checkPassword(body.password, user.password);
    if (!success) throw new ErrorGenerate('Incorrect email or password', statusCodes.unauthorized);
    const token = generateToken(user);
    return token;
  }
}

export default UserService;
