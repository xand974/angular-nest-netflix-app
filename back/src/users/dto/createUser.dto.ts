import { IsString } from 'class-validator';
import { UpdateUserDto } from './updateUser.dto';

export class CreateUserDto extends UpdateUserDto {
  @IsString()
  userId: string;
}
