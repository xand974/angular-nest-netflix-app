import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async genToken({ userId, isAdmin }: { userId: string; isAdmin: boolean }) {
    return await this.jwtService.sign(
      { userId, isAdmin },
      {
        secret: this.configService.get('SECRET_TOKEN'),
      },
    );
  }

  verifyToken(token: string) {
    const tokenHeader = token.split(' ')[1];
    const payload = this.jwtService.verify(tokenHeader, {
      secret: this.configService.get('SECRET_TOKEN'),
    });
    if (!payload)
      throw new HttpException(
        'you are not authentificated',
        HttpStatus.UNAUTHORIZED,
      );
    return payload;
  }
}
