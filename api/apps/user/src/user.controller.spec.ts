import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../libs/common/src/schemas/user.schema';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
      imports: [
        JwtModule.register({
          secret: 'test-12345',
          signOptions: { expiresIn: '1h' },
        }),
        MongooseModule.forRoot('mongodb+srv://mshaheryar:iKa25bf74pcuO2Nh@munhouse.4k26muu.mongodb.net/Munhouse'), 
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema, collection: 'Users'},]), 
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  afterEach(async () => {
    await app.close(); 
  });

  describe('User Profile Management', () => {
  it('Test Cases 1: Find Users without filter Success Test Cases', async () => {
    const filter: any = {}
    const res: any = await userController.get_all_users(filter)
    expect(Array.isArray(res)).toBe(true);
  });

  it('Test Cases 2: Find Users with filter Success Test Cases', async () => {
    const filter: any = {
      role: 'seller'
    }
    const res: any = await userController.get_all_users(filter)
    expect(Array.isArray(res)).toBe(true);
  });

  it('Test Cases 3: Find User By ID Success Test Cases', async () => {
    const id = '6550d88130dc51a0b4305b23'
    const res: any = await userController.find_user_by_id(id)
    expect(res).toHaveProperty('_id');
  });

  it('Test Cases 4: Find User By ID Exception Invalid ID Test Cases', async () => {
    const id = '6550d88130dc51a0b4305666'
    const res: any = await userController.find_user_by_id(id)
    expect(res.error).toBe('User not Found, with the given Id');
    expect(res.status).toBe(404)
  });

  it('Test Cases 14: Update User By Id Success Test Cases', async () => {
    const data = {id: '6550d88130dc51a0b4305b23', contact: 1234567}
    const res: any = await userController.update_user_by_id(data)
    expect(res).toHaveProperty('_id');
  });

  it('Test Cases 15: Update User By Id Exception Invalid ID Test Cases', async () => {
    const data = {id: '6550d88130dc51a0b4305222', contact: 1234567}
    const res: any = await userController.update_user_by_id(data)
    expect(res.error).toBe('User not Found, with the given Id')
    expect(res.status).toBe(404)
  });

  it('Test Cases 16: Delete User By Id Exception Invalid ID Test Cases', async () => {
    const id = '65524b35974d3102e9f30222'
    const res: any = await userController.delete_user_by_id(id)
    expect(res.error).toBe('User not Found, with the given Id')
    expect(res.status).toBe(404)
  });
 });
});
