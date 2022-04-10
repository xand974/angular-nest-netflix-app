import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  var user = {
    p: 22,
  };

  await app.listen(3000);
}
bootstrap();
