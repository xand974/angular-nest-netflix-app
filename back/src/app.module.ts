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
import { PasswordService } from './password/password.service';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    PasswordModule,
  ],
  providers: [PasswordService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        { path: '/api/users', method: RequestMethod.ALL },
        { path: '/api/films', method: RequestMethod.ALL },
      );
  }
}
