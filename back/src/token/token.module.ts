import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from './schema/token.schema';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    JwtModule.register({ secret: process.env.SECRET_TOKEN }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
