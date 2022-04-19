import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';
import { PasswordModule } from 'src/password/password.module';
import { UserInfosModule } from 'src/user-infos/user.infos.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serialize';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    EmailModule,
    UserInfosModule,
    PasswordModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
