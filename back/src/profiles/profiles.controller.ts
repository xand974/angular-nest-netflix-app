import {
  Controller,
  Get,
  Param,
  UseGuards,
  Logger,
  Post,
  Query,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles';
import { ProfileModel } from 'netflix-malet-types';

@UseGuards(AuthenticatedGuard)
@Controller('profiles')
export class ProfilesController {
  private logger = new Logger(ProfilesController.name);
  constructor(private readonly profilesService: ProfilesService) {}

  @Roles(Role.Admin)
  @Post('create')
  public async create(@Body() profile: ProfileModel) {
    const newProfile = await this.profilesService.create(profile);
    this.logger.log(`profile ${newProfile.id} has been created`);
    return {
      msg: 'profile created',
    };
  }

  @Get('get-one')
  public async getOne(@Query('id') id: string, @Query('name') name: string) {
    if (id) {
      return await this.profilesService.getOne(name);
    }
    if (name) {
      return await this.profilesService.getById(id);
    }
  }

  @Roles(Role.Admin)
  @Get('all-from-user')
  public async getAllFromUser(@Param('id') id: string) {
    const profiles = await this.profilesService.findAllFromUserId(id);
    return profiles;
  }

  @Roles(Role.Admin)
  @Patch('update/:id')
  public async update(@Param('id') id: string, @Body() profile: ProfileModel) {
    const updatedProfile = await this.profilesService.updateOne({
      id,
      ...profile,
    });
    this.logger.log(`profile ${id} has been updated`);
    return updatedProfile;
  }

  @Roles(Role.Admin)
  @Delete('delete/:id')
  public async delete(@Param('id') id: string) {
    await this.profilesService.deleteOne(id);
    this.logger.log(`profile ${id} has been deleted`);
    return {
      msg: 'profile has been deleted',
    };
  }
}
