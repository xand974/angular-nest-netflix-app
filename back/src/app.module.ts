import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    TokenModule,
  ],
  providers: [],
})
export class AppModule {}
