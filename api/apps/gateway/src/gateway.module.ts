import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import { IMAGES_SERVICE, USER_SERVICE, AUTH_SERVICE, HOUSE_SERVICE} from '../constants/services';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_IMAGES_QUEUE: Joi.string().required(),
        RABBIT_MQ_USER_QUEUE: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        RABBIT_MQ_HOUSE_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({
      secret: 'test-12345', 
      signOptions: { expiresIn: '1d' },
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './dist/apps/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop(); 
          callback(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
        },
      }),
    }),
    RmqModule.register({
      name: IMAGES_SERVICE,
    }),
    RmqModule.register({
      name: USER_SERVICE,
    }),
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    RmqModule.register({
      name: HOUSE_SERVICE,
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, JwtStrategy],
})
export class GatewayModule {}
