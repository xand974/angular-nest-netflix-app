import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const maxAge = parseInt(process.env.MAX_AGE_COOKIE);
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  // app.enableCors({ origin: 'http://localhost:5000' });
  await app.listen(3000);
}
bootstrap();
