import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'netflix-malet-types';
@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  genToken({ userId, isAdmin }: { userId: string; isAdmin: boolean }) {
    return this.jwtService.sign({ userId, isAdmin });
  }

  verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
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
