import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_IMAGES_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/images/.env',
    }),
    RmqModule,

  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
