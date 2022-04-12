import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Put('update-user/:id')
  public async updateUser(
    @Param('id') id,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
    return 'user has been updated';
  }

  @Delete('delete-user/:id')
  public async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return 'user has been deleted';
  }

  @Get('get-user/:id')
  public async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Get('get-all')
  public async getAllUser(limit?: number) {
    return await this.userService.getAll(limit);
  }

  @Get('get-by-email')
  public async getByEmail(email: string) {
    return await this.userService.getByEmail(email);
  }
}
