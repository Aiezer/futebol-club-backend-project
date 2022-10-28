import UserValidation from '../../../validations/UserValidation';
import { IUserLogin } from '../entities/interfaces/IUser';
import UserRepository from '../repository/UserRepository';
import { encryptPassword, Jwt } from '../../../utils';

export default class UserService {
  constructor(private userRepository = new UserRepository()) {}

  login = async (login: IUserLogin) => {
    const message = [
      '401|Incorrect email or password',
      '400|All fields must be filled',
    ];

    const checkFields: number = UserValidation.validateUser(login);
    if (checkFields !== -1) {
      throw new Error(message[checkFields]);
    }

    const user = await this.userRepository.handleLogin(login);
    if (!user) {
      throw new Error(message[0]);
    }

    const { id, username, password } = user;
    encryptPassword.checkPassword(login.password, password);

    const token = Jwt.createToken({ id, username });
    return token;
  };
}
