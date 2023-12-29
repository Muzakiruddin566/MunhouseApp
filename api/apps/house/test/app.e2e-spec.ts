import { Test, TestingModule } from '@nestjs/testing';
import { HouseController } from '../src/house.controller';
import { HouseService } from '../src/house.service';
import { HouseRepository } from '../src/house.repository';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { House, HouseSchema } from '@app/common/schemas/house.schema';
import { User, UserSchema } from '../../../libs/common/src/schemas/user.schema';

describe('HouseController', () => {
  let houseController: HouseController;
  let houseService: HouseService;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [HouseController],
      providers: [HouseService, HouseRepository],
      imports: [
        JwtModule.register({
          secret: 'test-12345',
          signOptions: { expiresIn: '1h' },
        }),
        MongooseModule.forRoot('mongodb+srv://mshaheryar:iKa25bf74pcuO2Nh@munhouse.4k26muu.mongodb.net/Munhouse'), 
        MongooseModule.forFeature([{ name: House.name, schema: HouseSchema, collection: 'Houses' },
        { name: User.name, schema: UserSchema, collection: 'Users'},
       ]), 
      ],
    }).compile();

    houseController = app.get<HouseController>(HouseController);
    houseService = app.get<HouseService>(HouseService);
  });

  afterEach(async () => {
    await app.close(); 
  });

  describe('House Listing', () => {
    it('Test Cases 1: Create House Success Test Cases', async () => {
        const getRandomString = (length: number) => {
          let result = '';
          const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
      
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
      
          return result;
        };
      
      const randomAddress = getRandomString(10);

      const houseData: any = {
        address: randomAddress,
        "area": 4001,
        "price": 20001,
        "no_of_washrooms": 51,
        "no_of_bedrooms": 21,
        "no_of_view_request": 81,
        "seller": "6550d88130dc51a0b4305b23"
      };
  
      const res: any = await houseController.create_house(houseData)
      expect(res).toHaveProperty(randomAddress);
    });
  });
});
