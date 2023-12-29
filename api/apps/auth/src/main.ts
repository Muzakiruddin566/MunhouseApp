import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService, {strict: false});
  app.connectMicroservice(rmqService.getOptions('AUTH'));
  await app.startAllMicroservices();
}
bootstrap();
