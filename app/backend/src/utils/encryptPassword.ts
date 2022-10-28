import * as bcrypt from 'bcryptjs';

require('express-async-errors');

/* This is a class that is used to check the password. */
export default class encryptPassword {
  static checkPassword(inputPassword:string, passwordHash:string): void | boolean {
    const check = bcrypt.compareSync(inputPassword, passwordHash);

    if (!check) {
      throw new Error('401|Incorrect email or password');
    }
    return true;
  }
}
