import {
  Body,
  Controller,
  Post,
  Logger,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieModel } from 'netflix-malet-types';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles';

@UseGuards(AuthenticatedGuard)
@Controller('api/movies')
export class MoviesController {
  private readonly logger = new Logger();
  constructor(private readonly movieService: MoviesService) {}

  @Roles(Role.Admin)
  @Post('create')
  public async create(@Body() movie: MovieModel) {
    const newMovie = await this.movieService.create(movie);
    this.logger.log(`movie ${newMovie.id} has been created`);
    return {
      msg: 'movie created',
    };
  }

  @Get('get-one')
  public async getOne(@Query('id') id: string) {
    const movieFound = await this.movieService.getById(id);
    this.logger.log(`random movie: ${movieFound.id} `);
    return movieFound;
  }

  @Post('get-movies-in-list')
  public async getMoviesInList(@Body() body: { ids: string[] }) {
    const { ids } = body;

    let movies: MovieModel[] = [];
    for (const id of ids) {
      const movie = await this.movieService.getById(id);
      if (!movie) return;
      movies.push(movie);
    }
    return movies;
  }

  @Get('random')
  public async getRandom(@Query('type') type: MovieModel['type']) {
    const movieFound = await this.movieService.getRandomMovie(type);
    this.logger.log(`random movie: ${movieFound.id} `);
    return movieFound;
  }

  @Roles(Role.Admin)
  @Get('all')
  public async getAll() {
    const movies = await this.movieService.getAll();
    this.logger.log(`get all movies`);
    return movies;
  }

  @Roles(Role.Admin)
  @Patch('update/:id')
  public async update(@Param('id') id: string, @Body() movie: MovieModel) {
    const updatedMovie = await this.movieService.updateOne({ id, ...movie });
    this.logger.log(`movie ${id} has been updated`);
    return updatedMovie;
  }

  @Roles(Role.Admin)
  @Delete('delete/:id')
  public async delete(@Param('id') id: string) {
    await this.movieService.deleteOne(id);
    this.logger.log(`movie ${id} has been deleted`);
    return {
      msg: 'movie has been deleted',
    };
  }
}
