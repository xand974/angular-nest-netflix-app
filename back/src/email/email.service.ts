import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { registerVerificationTemplate } from './templates/email-verification';

@Injectable()
export class EmailService {
  private logger = new Logger();
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
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
    const emailTemplate = registerVerificationTemplate(email, url);
    await this.mailerService.sendMail({
      to: email,
      from,
      html: emailTemplate,
      subject: text,
    });
    this.logger.log(
      `verification email from ${from} has been sended to ${email}`,
    );
  }
}
