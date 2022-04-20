import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { PasswordService } from 'src/password/password.service';
import { UserModel } from 'netflix-malet-types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(user: UserModel) {
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
    if (updateUserDto.password) {
      updateUserDto.password = await this.passwordService.genPassword(
        updateUserDto.password,
      );
    }
    await user.update(updateUserDto, {
      new: true,
    });
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
    const { password, ...rest } = user['_doc'];
    return user['_doc'];
  }

  public async isUserInDb(email: string): Promise<boolean> {
    return (await this.userModel.findOne({ email })) !== null ? true : false;
  }

  async getByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
    return user['_doc'];
  }

  async getAll(limit = 10) {
    const users = await this.userModel.find().limit(limit);
    return users;
  }

  async getUser(id: string) {
    const userFound = await this.userModel.findById(id);
    if (!userFound)
      throw new HttpException('no user found', HttpStatus.BAD_REQUEST);
    const { password, ...user } = userFound['_doc'];
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new HttpException('no user found', HttpStatus.BAD_REQUEST);

    await user.delete();
  }
}
