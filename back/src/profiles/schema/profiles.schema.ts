import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ProfileModel } from 'netflix-malet-types';
import { User } from 'src/users/schema/user.schema';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile implements ProfileModel {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  img: string;

  @Prop({ type: [String], default: [] })
  preferences?: string[];

  @Prop({ type: Boolean, default: false })
  default?: boolean;
}

const ProfileSchema = SchemaFactory.createForClass(Profile);

export { ProfileSchema };
