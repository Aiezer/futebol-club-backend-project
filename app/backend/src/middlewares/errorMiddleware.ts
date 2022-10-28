import { Request, Response, NextFunction } from 'express';

export default class ErrorHandler {
  static Response = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err.message.includes('|')) {
      const [code, message] = err.message.split('|');
      const codeNumber = Number(code);
      return res.status(codeNumber).json({ message });
    }

    console.log(err);

    return res.status(500).json({ message: 'Internal server error' });
  };
}
