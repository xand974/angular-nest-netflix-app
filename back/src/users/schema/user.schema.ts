import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ unique: true, required: true, type: String })
  email: string;

  @Prop({ required: true, type: Boolean })
  isVerified: boolean;

  @Prop({ required: true, type: [String] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
