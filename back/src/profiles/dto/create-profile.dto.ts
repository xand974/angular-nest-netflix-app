import { IsString } from 'class-validator';
import { ProfileModel } from 'netflix-malet-types';

export class CreateProfileDto {
  @IsString()
  userId: string;

  profile: ProfileModel;
}
