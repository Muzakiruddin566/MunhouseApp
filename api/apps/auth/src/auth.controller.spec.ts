import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/common/schemas/user.schema';


describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserRepository],
      imports: [
        JwtModule.register({
          secret: 'test-12345',
          signOptions: { expiresIn: '1h' },
        }),
        MongooseModule.forRoot('mongodb+srv://mshaheryar:iKa25bf74pcuO2Nh@munhouse.4k26muu.mongodb.net/Munhouse'), 
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema, collection: 'Users' }]), 
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await app.close(); 
  });

  describe('User Authentication', () => {
    it('Test Cases 1: Login Success Test Cases', async () => {
      const data: any = { email: 'tests@1235678.com', password: 'test123' }
      const res: any = await authController.login(data)
      expect(res.success).toBe(true);
      expect(res.user).toHaveProperty('_id');
      expect(res.access_token).toBeDefined();
    });

    it('Test Cases 2: Login Exception Email Missing', async () => {
      const data: any = { password: 'test123' }
      const res: any = await authController.login(data)
      expect(res).toEqual({ error: 'Email Required', status: 422 })
    });

    it('Test Cases 3: Login Exception Password Missing', async () => {
      const data: any = { email: 'tests@1235678.com' }
      const res: any = await authController.login(data)
      expect(res).toEqual({ error: 'Password Required', status: 422 })
    });

    it('Test Cases 4: Login Exception Invalid Credentials', async () => {
      const data: any = { email: 'tests@example.com', password: 'invalid-pass' }
      const res: any = await authController.login(data)
      expect(res).toEqual({ error: 'Invalid Credentials', status: 422 })
    });

    it('Test Cases 5: Signup Success Test Cases', async () => {
      function generateRandomEmail(): string {
        const getRandomString = (length: number) => {
          let result = '';
          const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
      
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
      
          return result;
        };
      
        const username = getRandomString(8); 
        const domain = 'test.com'; 
      
        return `${username}@${domain}`;
      }

      const randomEmail = generateRandomEmail();


      const userData: any = {
        first_name: 'John',
        last_name: 'Doe',
        address: '123 Main St',
        email: randomEmail,
        password: 'password123',
        contact: '1234567890',
      };
  
      const res: any = await authController.user_signup(userData)
      expect(res.success).toBe(true);
      expect(res.user).toHaveProperty('_id');
      expect(res.access_token).toBeDefined();
    });

    it('Test Cases 6: Signup Exception Email Missing', async () => {
      const userData: any = {
        first_name: 'John',
        last_name: 'Doe',
        address: '123 Main St',
        password: 'password123',
        contact: '1234567890',
      };
  
      const res: any = await authController.user_signup(userData)
      expect(res).toEqual({ error: 'Email Required', status: 422 })
    });

    it('Test Cases 7: Signup Exception First Name Missing', async () => {
      const userData: any = {
        last_name: 'Doe',
        address: '123 Main St',
        email: 'test@test.com',
        password: 'password123',
        contact: '1234567890',
      };
  
      const res: any = await authController.user_signup(userData)
      expect(res).toEqual({ error: 'First-name Required', status: 422 })
    });

    it('Test Cases 8: Signup Exception Last Name Missing', async () => {
      const userData: any = {
        first_name: 'John',
        address: '123 Main St',
        email: 'test@test.com',
        password: 'password123',
        contact: '1234567890',
      };
  
      const res: any = await authController.user_signup(userData)
      expect(res).toEqual({ error: 'Last-name Required', status: 422 })
    });

    it('Test Cases 9: Signup Exception Address Missing', async () => {
      const userData: any = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@test.com',
        password: 'password123',
        contact: '1234567890',
      };
  
      const res: any = await authController.user_signup(userData)
      expect(res).toEqual({ error: 'Address Required', status: 422 })
    });

    it('Test Cases 9: Signup Exception Password Missing', async () => {
      const userData: any = {
        first_name: 'John',
        last_name: 'Doe',
        address: '123 Main St',
        email: 'test@test.com',
        contact: '1234567890',
      };
  
      const res: any = await authController.user_signup(userData)
      expect(res).toEqual({ error: 'Password Required', status: 422 })
    });

    it('Test Cases 10: Signup Exception Contact Missing', async () => {
      const userData: any = {
        first_name: 'John',
        last_name: 'Doe',
        address: '123 Main St',
        password: 'password123',
        email: 'test@test.com',
      };
  
      const res: any = await authController.user_signup(userData)
      expect(res).toEqual({ error: 'User contact Required', status: 422 })
    });
  });
});
