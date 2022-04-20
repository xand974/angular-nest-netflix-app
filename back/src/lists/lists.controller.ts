import {
  Body,
  Controller,
  Get,
  Post,
  Logger,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles';
import { ListModel } from '../types/index';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../guards/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('api/lists')
export class ListsController {
  private readonly logger = new Logger();
  constructor(private readonly listService: ListsService) {}

  @Roles(Role.Admin)
  @Post('create')
  public async create(@Body() list: ListModel) {
    const newMovie = await this.listService.create(list);
    this.logger.log(`list ${newMovie.id} has been created`);
    return {
      msg: 'list created',
    };
  }

  @Get('get-one')
  public async getOne(@Body() name: string) {
    const movieFound = await this.listService.getByName(name);
    this.logger.log(`random list: ${movieFound.id} `);
    return movieFound;
  }

  @Get('get-id/:id')
  public async getById(@Param('id') id: string) {
    const movieFound = await this.listService.getById(id);
    this.logger.log(`random list: ${movieFound.id} `);
    return movieFound;
  }

  @Get('random')
  public async getRandom(@Query('size') size: string) {
    const movieFound = await this.listService.getRandomBySize(size);
    this.logger.log(`random list: ${movieFound.id} `);
    return movieFound;
  }

  @Roles(Role.Admin)
  @Get('all')
  public async getAll() {
    const movies = await this.listService.getAll();
    this.logger.log(`get all movies`);
    return movies;
  }

  @Roles(Role.Admin)
  @Patch('update/:id')
  public async update(@Param('id') id: string, @Body() list: ListModel) {
    const updatedMovie = await this.listService.updateOne({ id, ...list });
    this.logger.log(`list ${id} has been updated`);
    return {
      msg: 'movie has been updated',
    };
  }

  @Roles(Role.Admin)
  @Delete('delete/:id')
  public async delete(@Param('id') id: string) {
    await this.listService.deleteOne(id);
    this.logger.log(`list ${id} has been deleted`);
    return {
      msg: 'list has been deleted',
    };
  }
}
