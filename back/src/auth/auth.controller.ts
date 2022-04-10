import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    const res = await this.authService.register(registerDto);
    return res;
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    return res;
  }
}
