import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors();
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  await app.listen(3000);
}
bootstrap();
