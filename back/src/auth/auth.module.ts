import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { PasswordModule } from 'src/password/password.module';
import { UserInfosModule } from 'src/user.infos/user.infos.module';
import { UserSchema } from 'src/users/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    EmailModule,
    UserInfosModule,
    PasswordModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
