import { IsString } from 'class-validator';
import { RegisterDto } from './register.dto';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
