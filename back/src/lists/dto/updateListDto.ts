import { IsString } from 'class-validator';

export class UpdateListDto {
  @IsString()
  id: string;
}
