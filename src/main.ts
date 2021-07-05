import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * The function that initialize the server. <br>
 * CORS because front-end is at path "/" and the api at "/calc" <br>
 * Two ports option -> process.env.PORT for heroku, 8080 for local run.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
