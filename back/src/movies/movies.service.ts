import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schema/movie.schema';
import { Model } from 'mongoose';
import { MovieModel } from 'netflix-malet-types';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  public async create(movie: MovieModel) {
    const newMovie = new this.movieModel(movie);

    await newMovie.save();
    return newMovie;
  }

  public async getByName(name: string) {
    const movie = await this.movieModel.findOne({ name: name });
    if (!movie) throw new HttpException('no movie', HttpStatus.NOT_FOUND);
    return movie;
  }

  public async getById(id: string) {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new HttpException('no movie', HttpStatus.NOT_FOUND);
    return movie;
  }

  public async getRandomMovie(type: MovieModel['type']) {
    const movie = (await this.movieModel.aggregate([
      {
        $match: {
          type: type,
        },
      },
      {
        $sample: { size: 1 },
      },
    ])) as MovieModel[];
    if (!movie) throw new HttpException('no movie', HttpStatus.NOT_FOUND);
    return movie[0];
  }

  public async getAll(limit = 10, asc = true) {
    return await this.movieModel
      .find({})
      .sort({ _id: asc ? 1 : -1 })
      .limit(limit);
  }

  public async updateOne(movieDto: MovieModel) {
    const movie = await this.movieModel.findById(movieDto.id);
    if (!movie) throw new HttpException('no movie', HttpStatus.NOT_FOUND);

    const updatedMovie = await movie.updateOne({
      $set: { ...movieDto },
      new: true,
    });
    return updatedMovie;
  }

  public async deleteOne(id: string) {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new HttpException('no movie', HttpStatus.NOT_FOUND);
    await movie.delete();
  }
}
