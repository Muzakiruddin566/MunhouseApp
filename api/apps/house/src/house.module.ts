import { DatabaseModule, RmqService } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { House, HouseSchema } from '../../../libs/common/src/schemas/house.schema';
import { User, UserSchema } from '../../../libs/common/src/schemas/user.schema';
import { ViewRequest, ViewRequestSchema } from '../../../libs/common/src/schemas/viewRequest.schema';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { HouseRepository } from './house.repository';
import { ViewRequestRepository } from './viewRequest.repository';
import { RmqModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({
      secret: 'test-12345', 
      signOptions: { expiresIn: '1d' },
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_HOUSE_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/house/.env',
    }),
    RmqModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema, collection: 'Houses' },
     { name: User.name, schema: UserSchema, collection: 'Users'},
     { name: ViewRequest.name, schema: ViewRequestSchema, collection: 'viewRequests'},
   ]),
  ],
  controllers: [HouseController],
  providers: [HouseService, HouseRepository, ViewRequestRepository],
})
export class HouseModule {}