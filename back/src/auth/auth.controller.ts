import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UserInfosService } from 'src/user-infos/user.infos.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { EmailService } from '../email/email.service';
import { Request, Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileModel } from 'netflix-malet-types';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userInfosService: UserInfosService,
    private readonly emailService: EmailService,
    private readonly profileService: ProfilesService,
  ) {}

  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    this.logger.log(`proceed to register`);
    const { email, id } = await this.authService.register(registerDto);
    const infos = {
      userId: id,
      username: registerDto.username ?? 'default',
      city: 'somewhere',
      ip: 'unknown',
      photoURL: '/assets/images/default-user.png',
    };

    const profile: ProfileModel = {
      userId: id,
      name: 'Default',
      photoURL: '/assets/images/default-user.png',
      default: true,
    };

    const emailInfos = {
      email: 'weanimepro@gmail.com',
      isVerified: true,
    };

    await this.userInfosService.addUserInfos(infos);
    await this.profileService.create(profile, id);
    // await this.emailService.sendEmailVerification(emailInfos);

    this.logger.log(`register completed, new user : ${id}`);
    return {
      data: 'success',
    };
  }

  @Get('check-auth')
  checkAuth(@Req() req: Request) {
    return req.user && req.user !== null ? true : false;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login() {
    this.logger.log(`user is logged in`);
    return { data: 'success' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('connect.sid', {
      path: '/',
    });

    return {
      data: 'success',
    };
  }
}
