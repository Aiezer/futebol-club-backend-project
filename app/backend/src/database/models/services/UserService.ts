import UserValidation from '../../../validations/UserValidation';
import { IUserLogin } from '../entities/interfaces/IUser';
import UserRepository from '../repository/UserRepository';
import { encryptPassword, Jwt } from '../../../utils';

export default class UserService {
  constructor(
    private userRepository = new UserRepository(),
  ) {}

  login = async (login: IUserLogin) => {
    const { email } = login;
    const checkEmail = UserValidation.validateUser(email);
    if (!checkEmail) {
      throw new Error('401|Incorrect email or password');
    }

    const user = await this.userRepository.handleLogin(login);
    if (!user) {
      throw new Error('401|Incorrect email or password');
    }

    const { id, username, password } = user;

    encryptPassword.checkPassword(login.password, password);

    const token = Jwt.createToken({ id, username });
    return token;
  };
}
