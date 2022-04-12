import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'] as string;
    if (!token || token.split(' ')[0] != 'Bearer') return false;
    context['user'] = this.tokenService.verifyToken(token);
    return true;
  }
}
