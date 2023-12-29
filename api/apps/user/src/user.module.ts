import { DatabaseModule, RmqService } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { User, UserSchema } from '../../../libs/common/src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_USER_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/user/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema, collection: 'Users' }]),
    RmqModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RmqService],
})
export class UserModule {}
