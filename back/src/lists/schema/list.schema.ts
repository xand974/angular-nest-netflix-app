import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Document } from 'mongoose';
import { Movie } from '../../movies/schema/movie.schema';

export type ListType = List & Document;

@Schema({ timestamps: true })
export class List {
  @Prop({ type: [SchemaTypes.ObjectId], ref: Movie.name, required: true })
  movieIds: string[];

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: true })
  genre: string[];

  @Prop({ type: String, required: true })
  type: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
