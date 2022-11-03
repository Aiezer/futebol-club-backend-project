import { NextFunction, Request, Response } from 'express';
import { UserService } from '../database/models/services';
import { IUserLogin } from '../database/models/entities/interfaces/IUser';

export default class UserController {
  constructor(private userService: UserService) {}

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.login(req.body as IUserLogin);
      res.status(200).json({
        token: result,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
