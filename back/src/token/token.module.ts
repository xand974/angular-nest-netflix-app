import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_TOKEN,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
