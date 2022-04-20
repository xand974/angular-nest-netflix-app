import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MovieModel } from 'netflix-malet-types';

export type MovieType = Movie & Document;

@Schema({ timestamps: true })
export class Movie implements MovieModel {
  @Prop({ required: true, type: String, index: true })
  name: string;

  @Prop({ required: true })
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
}

const MovieSchema = SchemaFactory.createForClass(Movie);
MovieSchema.index({ name: 'text' });

export { MovieSchema };
