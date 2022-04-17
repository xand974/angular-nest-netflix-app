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
    try {
      const payload = this.jwtService.verify(tokenHeader, {
        secret: this.configService.get('SECRET_TOKEN'),
      });
      return payload;
    } catch (err) {
      throw new HttpException('token cannot be verified', HttpStatus.FORBIDDEN);
    }
  }

  genEmailToken({ email, isVerified }: { email: string; isVerified: boolean }) {
    return this.jwtService.sign(
      { email, isVerified },
      {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: this.configService.get(
          'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
        ),
      },
    );
  }
}
