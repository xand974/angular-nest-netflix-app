import { IsString } from 'class-validator';

export class SaveDto {
  @IsString()
  token: string;

  @IsString()
  userId: string;
}
