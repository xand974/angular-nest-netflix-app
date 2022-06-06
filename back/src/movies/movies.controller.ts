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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieModel } from 'netflix-malet-types';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles';
import { Movie } from './schema/movie.schema';

@UseGuards(AuthenticatedGuard)
@Controller('movies')
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

    let movies: Movie[] = [];
    for (const id of ids) {
      const movie = await this.movieService.getById(id);
      if (!movie) return;
      movies.push(movie);
    }
    return movies;
  }

  @Get('search')
  public async search(@Query('q') searchText: string) {
    const movies = await this.movieService.getAllSearchedMovies(searchText);
    this.logger.log(
      `query for ${searchText} | ${movies.length} matches were found `,
    );
    return movies;
  }

  @Get('random')
  public async getRandom(@Query('type') type: MovieModel['type']) {
    const movieFound = await this.movieService.getRandomMovie(type);
    this.logger.log(`random movie: ${movieFound._id} `);
    return movieFound;
  }

  @Get('all')
  public async getAll() {
    const movies = (await this.movieService.getAll()) ?? [];
    this.logger.log(`get all movies, count ${movies.length}`);
    return movies;
  }

  @Roles(Role.Admin)
  @Patch('update/:id')
  public async update(@Param('id') id: string, @Body() movie: MovieModel) {
    const updatedMovie = await this.movieService.updateOne({
      _id: id,
      ...movie,
    });
    this.logger.log(`movie ${id} has been updated`);
    return updatedMovie;
  }

  @Get('favorites/:id')
  public async getFavMovies(@Param('id') id: string) {
    if (!id)
      throw new HttpException('cannot get favorites', HttpStatus.BAD_REQUEST);
    this.logger.log(`get fav movies for ${id}`);
    return await this.movieService.getFavorites(id);
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
