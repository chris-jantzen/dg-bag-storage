import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(express.json());
  app.enableCors({
    origin: process.env.WHITE_LISTED_ORIGINS?.split(','),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
