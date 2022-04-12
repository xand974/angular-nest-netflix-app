import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordModule } from 'src/password/password.module';
import { TokenModule } from 'src/token/token.module';
import { UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PasswordModule,
    TokenModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
