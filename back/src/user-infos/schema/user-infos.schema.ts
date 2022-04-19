import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from '../../users/schema/user.schema';

export type UserInfosDocument = UserInfos & Document;

@Schema({ timestamps: true })
export class UserInfos {
  @Prop({ type: String })
  photoURL: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: String })
  ip?: string;
}

export const UserInfosSchema = SchemaFactory.createForClass(UserInfos);
