import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from '../password/password.service';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<string> {
    const userFound = await this.userService.getByEmail(registerDto.email);

    if (userFound) throw new HttpException('user exists', HttpStatus.CONFLICT);
    const hashPass = await this.passwordService.genPassword(
      registerDto.password,
    );
    this.userService.create({
      ...registerDto,
      password: hashPass,
      isAdmin: false,
      isVerified: false,
    });
    return 'user created';
  }

  public test() {
    return this.tokenService.genToken({ userId: '202202', isAdmin: false });
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
