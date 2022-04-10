import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  userId: string;

  @Prop()
  photoURL: string;

  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
