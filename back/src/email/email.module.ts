import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { TokenModule } from 'src/token/token.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TokenModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('HOST'),
          secureConnection: false,
          port: parseInt(configService.get<string>('PORT')),
          tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
          },
          auth: {
            user: configService.get<string>('EMAIL_NODE_CRE'),
            pass: configService.get<string>('PASS_NODE_CRE'),
          },
        },
        defaults: {
          from: `"noreply" ${configService.get<string>('FROM')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
