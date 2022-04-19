import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { UserInfosSchema, UserInfos } from './schema/user-infos.schema';
import { UserInfosController } from './user.infos.controller';
import { UserInfosService } from './user.infos.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: UserInfos.name, schema: UserInfosSchema },
    ]),
  ],
  controllers: [UserInfosController],
  providers: [UserInfosService],
  exports: [UserInfosService],
})
export class UserInfosModule {}
