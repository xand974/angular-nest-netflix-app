import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Put('update-user/:id')
  public async updateUser(
    @Param('id') id,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUser(id, updateUserDto);
    return res.status(200).json('user has been updated');
  }

  @Post('add-user-info')
  public async adduserInfo(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.addUserinfos(createUserDto);
    return user;
  }

  @Delete('delete-user/:id')
  public async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.userService.deleteUser(id);
    return res.status(200).json('user has been deleted');
  }

  @Get('get-user/:id')
  public async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }
}
