import { IsString } from 'class-validator';

export class FavoriteDto {
  @IsString()
  public userId: string;

  @IsString()
  public movieId: string;
}
