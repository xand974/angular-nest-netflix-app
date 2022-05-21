import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const maxAge = parseInt(process.env.MAX_AGE_COOKIE.trim());

  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true, origin: 'http://localhost:4200' },
  });

  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: maxAge,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  // app.enableCors({ origin: 'http://localhost:5000' });
  await app.listen(3000);
}
bootstrap();
