import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { Role } from 'src/roles/roles';
import { Roles } from '../roles/roles.decorator';
import { SeasonModel } from 'netflix-malet-types';

@UseGuards(AuthenticatedGuard)
@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get('get-one/:id')
  private async one(@Param('id') id: string) {
    const season = await this.seasonsService.getById(id);
    return {
      season,
      data: 'success',
    };
  }

  @Roles(Role.Admin)
  @Get('all')
  private async all() {
    const seasons = await this.seasonsService.getAll();
    return {
      seasons,
      data: 'success',
    };
  }

  @Roles(Role.Admin)
  @Post('add')
  private async create(@Body() body: { season: SeasonModel }) {
    const season = await this.seasonsService.createOne(body.season);
    return {
      season,
      data: 'success',
    };
  }

  @Roles(Role.Admin)
  @Patch('update-one')
  private async updateOne(
    @Body() body: { season: Partial<SeasonModel>; id: string },
  ) {
    await this.seasonsService.updateOne(body.id, body.season);
    return {
      data: 'success',
    };
  }

  @Roles(Role.Admin)
  @Delete('delete-one/:id')
  private async deleteOne(@Param('id') id: string) {
    await this.seasonsService.deleteOne(id);
    return {
      data: 'success',
    };
  }
}
