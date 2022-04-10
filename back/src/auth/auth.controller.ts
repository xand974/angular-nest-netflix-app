import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    const id = await this.authService.register(registerDto);
    await this.userService.addUserinfos({
      userId: id,
      photoURL: '/assets/img/default.png',
      username: 'default',
    });
    return 'user created';
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return token;
  }
}
