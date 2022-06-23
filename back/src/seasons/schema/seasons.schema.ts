import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { SeasonModel } from 'netflix-malet-types';

export type SeasonType = Season & Document;

@Schema({ timestamps: true })
export class Season implements SeasonModel {
  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Movie', required: true })
  seriesId: string[];

  @Prop({ type: String })
  name: string;

  @Prop({ type: Number, default: 1, required: true })
  totalSeason: number;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  uSeriesId: string;
}

const SeasonSchema = SchemaFactory.createForClass(Season);

export { SeasonSchema };
