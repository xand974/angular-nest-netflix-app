import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly tokenService: TokenService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}
  public async sendEmailVerification({
    email,
    isVerified,
  }: {
    email: string;
    isVerified: boolean;
  }) {
    const token = this.tokenService.genEmailToken({ email, isVerified });
    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;
    const text = `Welcome to the application ! Click on the link to finish the registration`;
    const from = this.configService.get('FROM');
    await this.mailerService.sendMail({
      to: email,
      from,
      subject: text,
      html: `<h1>Hello There , please click hier : ${url}</h1>`,
    });
  }
}
