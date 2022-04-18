import { IsString } from 'class-validator';
import { UpdateUserDto } from '../../users/dto/updateUser.dto';

export class AddUserInfosDto extends UpdateUserDto {
  @IsString()
  userId: string;

  @IsString()
  username: string;

  @IsString()
  city?: string;

  @IsString()
  ip?: string;

  @IsString()
  photoURL?: string;
}
