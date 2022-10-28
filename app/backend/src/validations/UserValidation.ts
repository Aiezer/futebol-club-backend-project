import { IUserLogin } from '../database/models/entities/interfaces/IUser';

export default class UserValidation {
  public static validateFields(login: IUserLogin): boolean {
    const { email, password } = login;
    if (email.length > 0 && password.length > 0) {
      return true;
    }
    return false;
  }

  private static validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  public static validateUser(login: IUserLogin): number {
    if (!this.validateFields(login)) {
      return 1;
    }
    const { email } = login;
    if (!this.validateEmail(email)) {
      return 0;
    }
    return -1;
  }
}
