import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { ImagesModule } from './images.module';

async function bootstrap() {
  const app = await NestFactory.create(ImagesModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('IMAGES'));
  await app.startAllMicroservices();
}
bootstrap();
