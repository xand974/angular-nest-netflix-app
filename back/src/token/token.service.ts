import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async genToken({ userId, isAdmin }: { userId: string; isAdmin: boolean }) {
    return await this.jwtService.sign(
      { userId, isAdmin },
      {
        secret: process.env.SECRET_TOKEN,
        expiresIn: '1d',
      },
    );
  }
}
