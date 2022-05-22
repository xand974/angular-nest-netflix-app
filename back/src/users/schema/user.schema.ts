import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserModel } from 'netflix-malet-types';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User implements UserModel {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ unique: true, required: true, type: String })
  email: string;

  @Prop({ required: true, type: Boolean })
  isVerified: boolean;

  @Prop({ required: true, type: [String] })
  roles: string[];

  @Prop({ required: true, type: Number, max: 4 })
  profileCount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
