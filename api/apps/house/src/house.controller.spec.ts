import { Test, TestingModule } from '@nestjs/testing';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { HouseRepository } from './house.repository';
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
    let createdhouseID: string
    const getRandomString = (length: number) => {
      let result = '';
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
  
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      return result;
    };

    it('Test Cases 1: Create House Success Test Cases', async () => {
      const randomAddress = getRandomString(10);

      const houseData: any = {
        address: randomAddress,
        area: 4001,
        price: 20001,
        no_of_washrooms: 51,
        no_of_bedrooms: 21,
        postal_code: 'AIB3G2',
        no_of_view_request: 81,
        seller: "6550d88130dc51a0b4305b23"
      };
  
      const res: any = await houseController.create_house(houseData)
      createdhouseID = res.id
      expect(res).toHaveProperty('_id');
      expect(res.address).toBe(randomAddress);
      expect(res.area).toBe(4001);
      expect(res.price).toBe(20001);
      expect(res.no_of_washrooms).toBe(51);
      expect(res.no_of_bedrooms).toBe(21);
      expect(res.no_of_view_request).toBe(81);      
    });

  it('Test Cases 2: Create House Exception Duplicate Address Test Cases', async () => {
    const houseData: any = {
      address: 'test_address',
      area: 4001,
      price: 20001,
      postal_code: 'AIB3G2',
      no_of_washrooms: 51,
      no_of_bedrooms: 21,
      no_of_view_request: 81,
      seller: "6550d88130dc51a0b4305b23"
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('House already exist with the same address');
    expect(res.status).toBe(400);  
  });

  it('Test Cases 3: Create House Exception Invalid Seller ID Test Cases', async () => {
    const randomAddress = getRandomString(10);

    const houseData: any = {
      address: randomAddress,
      area: 4001,
      price: 20001,
      postal_code: 'AIB3G2',
      no_of_washrooms: 51,
      no_of_bedrooms: 21,
      no_of_view_request: 81,
      seller: "6550d88130dc51a0b4309999"
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('Seller not found');
    expect(res.status).toBe(400);  
  });

  it('Test Cases 4: Create House Exception Address Missing Test Cases', async () => {
    const houseData: any = {
      area: 4001,
      price: 20001,
      no_of_washrooms: 51,
      no_of_bedrooms: 21,
      no_of_view_request: 81,
      seller: "6550d88130dc51a0b4309999"
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('Address Required');
    expect(res.status).toBe(422);  
  });

  it('Test Cases 5: Create House Exception Area Missing Test Cases', async () => {
    const houseData: any = {
      address: 'test_address',
      price: 20001,
      no_of_washrooms: 51,
      no_of_bedrooms: 21,
      no_of_view_request: 81,
      seller: "6550d88130dc51a0b4309999"
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('Area Required');
    expect(res.status).toBe(422);  
  });

  it('Test Cases 6: Create House Exception Price Missing Test Cases', async () => {
    const houseData: any = {
      address: 'test_address',
      area: 4001,
      no_of_washrooms: 51,
      no_of_bedrooms: 21,
      no_of_view_request: 81,
      seller: "6550d88130dc51a0b4309999"
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('Price Required');
    expect(res.status).toBe(422);  
  });

  it('Test Cases 7: Create House Exception Number of Washrooms Missing Test Cases', async () => {
    const houseData: any = {
      address: 'test_address',
      area: 4001,
      price: 20001,
      no_of_bedrooms: 21,
      no_of_view_request: 81,
      seller: "6550d88130dc51a0b4309999"
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('Total Number of Washrooms Required');
    expect(res.status).toBe(422);  
  });

  it('Test Cases 8: Create House Exception Number of Bedrooms Missing Test Cases', async () => {
    const houseData: any = {
      address: 'test_address',
      area: 4001,
      price: 20001,
      no_of_washrooms: 51,
      no_of_view_request: 81,
      seller: "6550d88130dc51a0b4309999"
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('Total Number of Bedrooms Required');
    expect(res.status).toBe(422);  
  });

  it('Test Cases 9: Create House Exception Number of Bedrooms Missing Test Cases', async () => {
    const houseData: any = {
      address: 'test_address',
      area: 4001,
      price: 20001,
      no_of_washrooms: 51,
      no_of_view_request: 81,
      seller: "6550d88130dc51a0b4309999"
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('Total Number of Bedrooms Required');
    expect(res.status).toBe(422);  
  });

  it('Test Cases 10: Create House Exception Seller ID Missing Test Cases', async () => {
    const houseData: any = {
      address: 'test_address',
      area: 4001,
      price: 20001,
      no_of_washrooms: 51,
      no_of_bedrooms: 21,
      no_of_view_request: 81,
    };

    const res: any = await houseController.create_house(houseData)
    expect(res.error).toBe('Seller-Id Required');
    expect(res.status).toBe(422);  
  });

  it('Test Cases 11: Find all Houses Success Test Cases', async () => {
    const filter: any = {}
    const res: any = await houseController.find_all_houses(filter)
    expect(Array.isArray(res)).toBe(true);
  });

  it('Test Cases 12: Find Houses with filter Success Test Cases', async () => {
    const filter: any = {
      noOfBedrooms: 5
    }
    const res: any = await houseController.find_all_houses(filter)
    expect(Array.isArray(res)).toBe(true);
  });

  it('Test Cases 13: Find House By Id Success Test Cases', async () => {
    const id = '65524b35974d3102e9f30027'
    const res: any = await houseController.find_house_by_id(id)
    expect(res).toHaveProperty('_id');
  });

  it('Test Cases 13: Find House By Id Success Test Cases', async () => {
    const id = '65524b35974d3102e9f30027'
    const res: any = await houseController.find_house_by_id(id)
    expect(res).toHaveProperty('_id');
  });

  it('Test Cases 13: Find House By Id Exception Invalid ID Test Cases', async () => {
    const id = '65524b35974d3102e9f30222'
    const res: any = await houseController.find_house_by_id(id)
    expect(res.error).toBe('House not Found, with the given Id')
    expect(res.status).toBe(404)
  });

  it('Test Cases 14: Update House By Id Success Test Cases', async () => {
    const data = {id: '65524b35974d3102e9f30027', price: 50000500}
    const res: any = await houseController.update_house_by_id(data)
    expect(res).toHaveProperty('_id');
  });

  it('Test Cases 15: Update House By Id Exception Invalid ID Test Cases', async () => {
    const data = {id: '65524b35974d3102e9f30222', price: 50000500}
    const res: any = await houseController.update_house_by_id(data)
    expect(res.error).toBe('House not Found, with the given Id')
    expect(res.status).toBe(404)
  });

  it('Test Cases 16: Delete House By Id Success Test Cases', async () => {
    const id = createdhouseID
    const res: any = await houseController.delete_house_by_id(id)
    expect(res.msg).toBe('House deleted with success')
    expect(res.success).toBe(true)
  });

  it('Test Cases 16: Delete House By Id Exception Invalid ID Test Cases', async () => {
    const id = '65524b35974d3102e9f30222'
    const res: any = await houseController.delete_house_by_id(id)
    expect(res.error).toBe('House not Found, with the given Id')
    expect(res.status).toBe(404)
  });
 });
});
