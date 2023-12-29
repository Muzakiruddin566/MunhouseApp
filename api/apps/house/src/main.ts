import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { HouseModule } from './house.module';

async function bootstrap() {
  const app = await NestFactory.create(HouseModule);
  const rmqService = app.get<RmqService>(RmqService, {strict: false});
  app.connectMicroservice(rmqService.getOptions('HOUSE'));
  await app.startAllMicroservices();
}
bootstrap();