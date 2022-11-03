import { Response, Request, NextFunction } from 'express';
import { Jwt } from '../utils';

export default class TokenHandler {
  static checkToken = async (req: Request, res: Response, next:NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    Jwt.checkToken(token);
    next();
  };

  static getTokenData = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    Jwt.checkToken(token);
    const { role } = Jwt.getTokenData(token);
    return res.status(200).json({ role });
  };
}
