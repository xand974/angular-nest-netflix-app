import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schema/list.schema';
import { Model } from 'mongoose';
import { ListModel } from 'netflix-malet-types';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<List>,
  ) {}

  public async create(list: ListModel) {
    const newMovie = new this.listModel(list);
    await newMovie.save();
    return newMovie;
  }

  public async getById(id: string) {
    const list = await this.listModel.findById(id);
    if (!list) throw new HttpException('no list', HttpStatus.NOT_FOUND);
    return list;
  }

  public async getByName(name: string) {
    const list = await this.listModel.findOne({ name: name });
    if (!list) throw new HttpException('no list', HttpStatus.NOT_FOUND);
    return list;
  }

  public async getRandomBySize(size: string) {
    const sizeToNum = parseInt(size);
    const list = (await this.listModel.aggregate([
      {
        $sample: { size: sizeToNum },
      },
    ])) as ListModel[];

    if (!list) throw new HttpException('no list', HttpStatus.NOT_FOUND);
    if (sizeToNum > 1) return list;
    return list[0];
  }

  public async getAll(limit = 10, asc = true) {
    return await this.listModel
      .find({})
      .sort({ _id: asc ? 1 : -1 })
      .limit(limit);
  }

  public async updateOne(listDto: ListModel) {
    const list = await this.listModel.findById(listDto.id);
    if (!list) throw new HttpException('no list', HttpStatus.NOT_FOUND);

    const updatedList = await list.updateOne({
      $set: { ...listDto },
      new: true,
    });
    return updatedList;
  }

  public async deleteOne(id: string) {
    const list = await this.listModel.findById(id);
    if (!list) throw new HttpException('no list', HttpStatus.NOT_FOUND);
    await list.delete();
  }
}
