import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { AddUserInfosDto } from './dto/add-user-infos.dto';
import { UserInfosService } from './user.infos.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { FavoriteDto } from './dto/favorites.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@UseGuards(AuthenticatedGuard)
@Controller('user-infos')
export class UserInfosController {
  private logger: Logger = new Logger(UserInfosController.name);
  constructor(private readonly userInfosService: UserInfosService) {}

  @Post('add-user-info')
  public async addUserInfo(@Body() addUserInfosDto: AddUserInfosDto) {
    this.logger.log(`proceed to add infos`);
    const user = await this.userInfosService.addUserInfos(addUserInfosDto);
    return user;
  }

  @Get('get')
  public async getInfos(@Query('u') username: string) {
    this.logger.log(`proceed to get infos`);
    return await this.userInfosService.getUserInfos(username);
  }

  @Post('favorites')
  public async addOrRemoveFromFavorites(@Body() body: FavoriteDto) {
    this.logger.log(`handle favorites`);
    const user = await this.userInfosService.getByUserId(body.userId);
    if (!user)
      throw new HttpException(
        'cannot add to favorites',
        HttpStatus.BAD_REQUEST,
      );
    const favorites = user.favorites ?? [];
    const isInFav = favorites.some((item: string) => item === body.movieId);
    let updated;
    if (isInFav)
      updated = await this.userInfosService.removeFromFavorites(
        body.userId,
        body.movieId,
      );
    else
      updated = await this.userInfosService.addToFavorites(
        body.userId,
        body.movieId,
      );
    this.logger.log(
      `movieId in array : ${isInFav}, count favorites : ${updated?.favorites?.length}`,
    );

    return {
      data: 'success',
    };
  }
}
