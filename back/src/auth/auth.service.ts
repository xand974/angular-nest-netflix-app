import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/_db/user.schema';
import { Model } from 'mongoose';
import { encryptPassword } from '../utils/hash';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly tokenService: TokenService,
  ) {}

  public async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const userFound = await this.userModel.findOne({ email });
    if (userFound) throw new BadRequestException();
    const hashPass = await encryptPassword(password);
    const user = new this.userModel({ email, password: hashPass });
    const result = await user.save();
    return result.id;
  }

  public async login({ email, password }: { email: string; password: string }) {
    const userFound = await this.userModel.findOne({ email });
    if (!userFound) throw new NotFoundException();
    const isVerify = await bcrypt.compare(password, userFound.password);
    if (!isVerify) throw new BadRequestException();

    const token = this.tokenService.genToken({
      userId: userFound.id,
      isAdmin: userFound.isAdmin ?? false,
    });

    return token;
  }
}
