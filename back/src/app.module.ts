import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';
import { AdminMiddleware } from './middlewares/admin.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserInfosModule } from './user.infos/user.infos.module';

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
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        { path: 'api/users', method: RequestMethod.ALL },
        { path: 'api/user-infos', method: RequestMethod.ALL },
        { path: 'api/films', method: RequestMethod.ALL },
      );
  }
}
