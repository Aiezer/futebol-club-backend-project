import * as bcrypt from 'bcryptjs';

require('express-async-errors');

export default class encryptPassword {
  static checkPassword(inputPassword:string, passwordHash:string) {
    const check = bcrypt.compareSync(inputPassword, passwordHash);

    if (!check) {
      throw new Error('401|Incorrect email or password');
    }
  }
}
