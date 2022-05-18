import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UserInfosService } from 'src/user-infos/user.infos.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { EmailService } from '../email/email.service';
import { Request, Response } from 'express';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userInfosService: UserInfosService,
    private readonly emailService: EmailService,
  ) {}

  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    this.logger.log(`proceed to register`);
    const { email, id } = await this.authService.register(registerDto);
    await this.userInfosService.addUserInfos({
      photoURL: '/assets/img/default-user.jpg',
      userId: id,
      username: registerDto.username ?? 'default',
      city: 'somewhere',
      ip: 'unknown',
    });
    // await this.emailService.sendEmailVerification({
    //   email: 'weanimepro@gmail.com',
    //   isVerified: true,
    // });
    this.logger.log(`register completed, new user : ${id}`);
    return {
      data: 'success',
    };
  }

  @Get('check-auth')
  checkAuth(@Req() req: Request) {
    req.session['auth'] = true;
    console.log(req.user);

    return req.user && req.user !== null ? true : false;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: Request) {
    console.log(req.user);
    this.logger.log(`user is logged in`);
    return { data: 'success', user: req.user };
  }

  @Post('logout')
  logout(@Req() req: Request) {
    req.session.destroy((err) => {
      throw new Error(err);
    });
    this.logger.log(`user is logged out`);

    return {
      data: 'success',
    };
  }
}
