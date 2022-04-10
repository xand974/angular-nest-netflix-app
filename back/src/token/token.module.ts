import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_TOKEN })],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
