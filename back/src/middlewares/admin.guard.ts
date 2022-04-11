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
    if (req['user'].isAdmin) next();

    throw new HttpException('permission denied', HttpStatus.UNAUTHORIZED);
  }
}
