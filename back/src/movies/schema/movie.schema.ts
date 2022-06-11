import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { MovieModel } from 'netflix-malet-types';
import { Season } from '../../seasons/schema/seasons.schema';

export type MovieType = Movie & Document;

@Schema({ timestamps: true })
export class Movie implements MovieModel {
  @Prop({ required: true, type: String, index: true })
  name: string;

  @Prop({ required: true, type: String, index: true })
  synopsis: string;

  @Prop({ type: Number })
  ageLimit?: number;

  @Prop({ type: Number })
  releaseYear?: number;

  @Prop({ required: true, type: String })
  movieURL: string;

  @Prop({ type: String })
  bigPictureURL?: string;

  @Prop({ type: String })
  thumbnailURL: string;

  @Prop({ type: [String], default: [] })
  genre: string[];

  @Prop({ type: String })
  type: 'series' | 'movie' | 'documentary';

  @Prop({ type: Number, default: 1 })
  season?: number;

  @Prop({ type: Number, default: 1 })
  episode?: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: Season.name })
  seasonId?: string;

  @Prop({ type: String })
  uSeriesId?: string;
}

const MovieSchema = SchemaFactory.createForClass(Movie);
MovieSchema.indexes();

export { MovieSchema };
