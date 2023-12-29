import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './../src/auth.module';
import { AuthService } from './../src/auth.service';


describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user_signup (POST) - should create a new user', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      address: '123 Main St',
      email: 'john@example.com',
      password: 'password123',
      contact: '1234567890',
    };

    const response = await request(app.getHttpServer())
      .post('/user_signup')
      .send(userData)
      .expect(HttpStatus.CREATED);

    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.access_token).toBeDefined();
  });

  it('/user_signup (POST) - should handle validation errors', async () => {
    const invalidUserData = {
      // Invalid data without required fields
    };

    const response = await request(app.getHttpServer())
      .post('/user_signup')
      .send(invalidUserData)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(response.body.error).toBeDefined();
    expect(response.body.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  it('/user_login (POST) - should login a user', async () => {
    const userCredentials = {
      email: 'john@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/user_login')
      .send(userCredentials)
      .expect(HttpStatus.OK);

    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.access_token).toBeDefined();
  });

  it('/user_login (POST) - should handle login with invalid credentials', async () => {
    const invalidCredentials = {
      email: 'nonexistent@example.com',
      password: 'invalidpassword',
    };

    const response = await request(app.getHttpServer())
      .post('/user_login')
      .send(invalidCredentials)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body.error).toBeDefined();
    expect(response.body.status).toBe(HttpStatus.UNAUTHORIZED);
  });
});
