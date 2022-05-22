import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ProfileModel } from 'netflix-malet-types';
import { User } from 'src/users/schema/user.schema';

export type ProfileType = Profile & Document;

@Schema({ timestamps: true })
export class Profile implements ProfileModel {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  userId: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  img: string;

  @Prop({ type: [String] })
  preferences?: string[];

  @Prop({ type: Boolean })
  default?: boolean;
}

const ProfileSchema = SchemaFactory.createForClass(Profile);

export { ProfileSchema };
