import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile } from './schema/profiles.schema';
import { MovieSchema } from 'src/movies/schema/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: MovieSchema }]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
