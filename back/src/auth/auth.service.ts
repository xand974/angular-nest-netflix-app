import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from '../password/password.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
  ) {}

  public async register(
    registerDto: RegisterDto,
  ): Promise<{ email: string; id: string }> {
    const userFound = await this.userService.isUserInDb(registerDto.email);
    if (userFound) throw new HttpException('user exists', HttpStatus.CONFLICT);
    const hashPass = await this.passwordService.genPassword(
      registerDto.password,
    );
    const { email, id } = await this.userService.create({
      ...registerDto,
      password: hashPass,
      roles: ['user'],
      isVerified: false,
      profileCount: 0,
      photoURL: '/assets/images/default-user.png',
    });

    return { email, id };
  }

  public async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = await this.userService.getByUsername(username);
    if (!user) throw new HttpException('no user', HttpStatus.UNAUTHORIZED);
    const isOk = await this.passwordService.verifyPassword(
      password,
      user.password,
    );
    if (!isOk) throw new HttpException('mauvais mdp', HttpStatus.FORBIDDEN);
    const { password: pass, ...rest } = user;

    return rest;
  }
}
