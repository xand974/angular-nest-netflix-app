import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { RegisterDto } from './dto/register.dto';
import { UserModel } from 'src/types';
import { User } from 'src/users/schema/user.schema';
import { PasswordService } from '../password/password.service';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly emailService: EmailService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<string> {
    const userFound = await this.userModel.findOne({
      email: registerDto.email,
    });

    if (userFound) throw new HttpException('user exists', HttpStatus.CONFLICT);
    const hashPass = await this.passwordService.genPassword(
      registerDto.password,
    );
    const user = new this.userModel({
      ...registerDto,
      password: hashPass,
      isAdmin: false,
      isVerified: false,
    });
    const result = await user.save();
    this.emailService.sendEmailVerification({
      email: user.email,
      isVerified: true,
    });
    return result.id;
  }

  public async login({ email, password }: { email: string; password: string }) {
    const userFound = (await this.userModel.findOne({ email })) as UserModel;
    if (!userFound)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    if (!userFound.isVerified) {
      this.emailService.sendEmailVerification({
        email: userFound.email,
        isVerified: true,
      });
    }
    const samePass = await bcrypt.compare(password, userFound.password);
    if (!samePass)
      throw new HttpException('are you really you ?', HttpStatus.FORBIDDEN);

    const token = await this.tokenService.genToken({
      userId: userFound.id,
      isAdmin: userFound.isAdmin ?? false,
    });
    return token;
  }
}
