import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserInfosModule } from './user-infos/user.infos.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';
import { MoviesModule } from './movies/movies.module';
import { ListsModule } from './lists/lists.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProfilesModule,
    TokenModule,
    UserInfosModule,
    MoviesModule,
    ListsModule,
    AnalyticsModule,
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
