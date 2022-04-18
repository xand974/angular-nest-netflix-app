import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserInfosDocument = UserInfos & Document;

@Schema()
export class UserInfos {
  @Prop()
  photoURL: string;

  @Prop()
  userId: string;

  @Prop()
  username: string;
  @Prop()
  city?: string;
  @Prop()
  ip?: string;
}

export const UserInfosSchema = SchemaFactory.createForClass(UserInfos);
