import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/auth/schema/auth.schema';
import { Model } from 'mongoose';
import { encryptPassword } from '../utils/hash';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { RegisterDto } from './dto/register.dto';
import { UserModel } from 'src/types';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
    private readonly tokenService: TokenService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<string> {
    const userFound = await this.authModel.findOne({
      email: registerDto.email,
    });
    if (userFound) throw new BadRequestException();
    const hashPass = await encryptPassword(registerDto.password);
    const user = new this.authModel({
      email: registerDto.email,
      password: hashPass,
      isAdmin: false,
    });
    const result = await user.save();
    return result.id;
  }

  public async login({ email, password }: { email: string; password: string }) {
    const userFound = (await this.authModel.findOne({ email })) as UserModel;
    if (!userFound) throw new NotFoundException();
    const isVerify = await bcrypt.compare(password, userFound.password);
    if (!isVerify) throw new BadRequestException();

    const token = await this.tokenService.genToken({
      userId: userFound.id,
      isAdmin: userFound.isAdmin,
    });
    const res = await this.tokenService.save({
      token,
      userId: userFound.id,
    });
    return res.token;
  }
}
