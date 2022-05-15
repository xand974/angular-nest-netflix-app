import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UserInfosService } from 'src/user-infos/user.infos.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { EmailService } from '../email/email.service';

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
    await this.userInfosService.addUserinfos({
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login() {
    this.logger.log(`user is logged in`);
    return { msg: 'logged in !' };
  }
}
