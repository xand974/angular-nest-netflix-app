import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Season, SeasonType } from './schema/seasons.schema';
import { Model } from 'mongoose';
import { SeasonModel, MovieModel } from 'netflix-malet-types';
import { randomUUID } from 'crypto';
import { MoviesService } from '../movies/movies.service';
import { MovieType } from 'src/movies/schema/movie.schema';

@Injectable()
export class SeasonsService {
  private logger = new Logger(SeasonsService.name);
  constructor(
    @InjectModel(Season.name) private seasonModel: Model<SeasonType>,
  ) {}

  public async createOne(_season: Partial<SeasonModel>) {
    try {
      const season = new this.seasonModel({
        ..._season,
      });
      const newSeason = await season.save();
      this.logger.log(`new season created ${newSeason._id}`);
      return newSeason.id;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getById(id: string) {
    if (!id) throw new HttpException('no id provided', HttpStatus.BAD_REQUEST);
    try {
      const season = await this.seasonModel.findById(id);
      if (!season)
        throw new HttpException('no season found', HttpStatus.NOT_FOUND);
      return season;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll() {
    try {
      const seasons = (await this.seasonModel.find({})) ?? [];
      return seasons;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async hasSeason(uSeriesId: string) {
    if (!uSeriesId) return false;
    const season = await this.seasonModel.findOne({ uSeriesId });
    return season !== null;
  }

  public async addSeriesToSeason(
    movie: MovieType,
    moviesModel: Model<MovieType>,
  ) {
    try {
      const hasSeason = await this.hasSeason(movie.uSeriesId ?? '');
      if (!hasSeason) {
        const season = {
          name: movie.name,
          seriesId: [movie._id],
          description: '',
          totalSeason: movie.season ?? 1,
          uSeriesId: movie.uSeriesId,
        } as SeasonModel;
        const seasonId = await this.createOne(season);
        await moviesModel.findByIdAndUpdate(
          movie.id,
          {
            seasonId,
          },
          { new: true },
        );
        this.logger.log(
          `new season ${seasonId} has been added and movie ${movie.id} has been updated`,
        );
        return;
      }
      const season = await this.getByUID(movie.uSeriesId);
      this.logger.log(
        ` movie ${movie.id} has been added in the season ${season.id}`,
      );
      await this.addToSeason(season.id, movie._id);
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async addToSeason(seasonId: string, movieId: string) {
    await this.seasonModel.findByIdAndUpdate(seasonId, {
      $push: { seriesId: movieId },
    });
  }

  public async getByUID(uId: string) {
    try {
      const season = await this.seasonModel.findOne({ uSeriesId: uId });
      if (!season)
        throw new HttpException('season not found', HttpStatus.NOT_FOUND);
      return season;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateOne(id: string, _season: Partial<SeasonModel>) {
    if (!id) throw new HttpException('no id provided', HttpStatus.BAD_REQUEST);

    try {
      const season = await this.seasonModel.findById(id);
      if (!season)
        throw new HttpException('no season found', HttpStatus.NOT_FOUND);

      const updatedSeason = await season.updateOne({
        $set: { ..._season },
        new: true,
      });
      return updatedSeason;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteOne(id: string) {
    if (!id) throw new HttpException('no id provided', HttpStatus.BAD_REQUEST);
    try {
      await this.seasonModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
