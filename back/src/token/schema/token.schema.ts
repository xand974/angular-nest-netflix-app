import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop()
  token: string;

  @Prop()
  userId: string;

  @Prop()
  expiresIn: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
