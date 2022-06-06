import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserModel } from 'netflix-malet-types';
import { User } from '../../users/schema/user.schema';

export type UserInfosDocument = UserInfos & Document;

@Schema({ timestamps: true })
export class UserInfos implements Partial<UserModel> {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: String })
  ip?: string;

  @Prop({ type: [String] })
  favorites?: string[];
}

export const UserInfosSchema = SchemaFactory.createForClass(UserInfos);
