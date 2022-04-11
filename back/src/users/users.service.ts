import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { Auth } from 'src/auth/schema/auth.schema';
import { CreateUserDto } from './dto/createUser.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUser(id);
    await user.update(updateUserDto, {
      new: true,
    });
  }

  async getByEmail(email: string) {
    const user = await this.authModel.findOne({ email });
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
    return user;
  }

  async getAll(limit = 10) {
    const users = await this.userModel.find().limit(limit);
    return users;
  }

  async addUserinfos(createUserDto: CreateUserDto) {
    const user = await this.authModel.findById(createUserDto.userId);
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);

    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    return newUser;
  }

  async getUser(id: string) {
    const user = await this.userModel.findOne({ userId: id });
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.getUser(id);
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);

    await user.delete();
  }
}
