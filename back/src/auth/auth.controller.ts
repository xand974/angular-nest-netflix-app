import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UserInfosService } from 'src/user.infos/user.infos.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    private userInfosService: UserInfosService,
  ) {}

  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    const id = await this.authService.register(registerDto);
    await this.userInfosService.addUserinfos({
      photoURL: '/assets/img/default-user.jpg',
      userId: id,
      username: registerDto.username ?? 'default',
      city: 'somewhere',
      ip: 'unknown',
    });
    this.logger.log(`register completed, new user : ${id}`);
    return 'user created';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login() {
    this.logger.log(`user is logged in`);
    return { msg: 'logged in !' };
  }
}
