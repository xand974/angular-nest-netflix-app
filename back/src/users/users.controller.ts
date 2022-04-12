import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly userService: UsersService) {}

  @Put('update-user/:id')
  public async updateUser(
    @Param('id') id,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
    this.logger.log(`user ${id} has been updated`);
    return 'user has been updated';
  }

  @Delete('delete-user/:id')
  public async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    this.logger.log(`user ${id} has been deleted successfully`);
    return 'user has been deleted';
  }

  @Get('get-user/:id')
  public async getUser(@Param('id') id: string) {
    this.logger.log(`get user : ${id}`);
    return await this.userService.getUser(id);
  }

  @Get('get-all')
  public async getAllUser(limit?: number) {
    this.logger.log(`proceed get ${limit} users`);
    return await this.userService.getAll(limit);
  }

  @Get('get-by-email')
  public async getByEmail(email: string) {
    this.logger.log(`proceed to get ${email} informations`);
    return await this.userService.getByEmail(email);
  }
}
