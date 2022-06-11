import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonController } from './seasons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Season, SeasonSchema } from './schema/seasons.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Season.name, schema: SeasonSchema }]),
  ],
  controllers: [SeasonController],
  exports: [SeasonsService],
  providers: [SeasonsService],
})
export class SeasonsModule {}
