import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';
import { AdminMiddleware } from './middlewares/admin.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserInfosModule } from './user-infos/user.infos.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TokenModule,
    UserInfosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
