import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const rmqService = app.get<RmqService>(RmqService,{strict: false});
  app.connectMicroservice(rmqService.getOptions('USER'));
  await app.startAllMicroservices();
}
bootstrap();


