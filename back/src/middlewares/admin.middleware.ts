import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req['user'])
      throw new HttpException(
        'you are not authentificated',
        HttpStatus.UNAUTHORIZED,
      );
    if (req['user'].isAdmin || req['user'].id === req.body['id']) next();

    throw new HttpException('permission denied', HttpStatus.UNAUTHORIZED);
  }
}
