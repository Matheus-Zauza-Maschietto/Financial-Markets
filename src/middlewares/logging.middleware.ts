import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const dateStart = Date.now();
    next();
    console.log(`
      Request for: ${req.url} \nRequest time: ${Date.now() - dateStart}`);
  }
}
