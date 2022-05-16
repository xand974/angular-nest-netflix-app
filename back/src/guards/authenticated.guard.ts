import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  private logger = new Logger(AuthenticatedGuard.name);
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    this.logger.log(`user is auth : ${request.isAuthenticated()}`);
    return request.isAuthenticated();
  }
}
