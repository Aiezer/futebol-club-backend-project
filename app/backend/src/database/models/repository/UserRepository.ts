import IUser, { IUserLogin } from '../entities/interfaces/IUser';
// import { encryptPassword, Jwt } from '../../../utils';
import Users from '../entities/Users';

export default class UserRepository {
  handleLogin = async (login: IUserLogin):Promise< IUser | null > => {
    const { email } = login;

    const user = await Users.findOne({ where: { email } });
    return user;
  };
}
