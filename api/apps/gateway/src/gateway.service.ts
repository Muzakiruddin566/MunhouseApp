import { User } from '@app/common/schemas/user.schema';
import { House } from '@app/common/schemas/house.schema';
import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as multer from 'multer';
import { IMAGES_SERVICE, USER_SERVICE, AUTH_SERVICE, HOUSE_SERVICE } from '../constants/services';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(IMAGES_SERVICE) private imagesClient: ClientProxy,
    @Inject(USER_SERVICE) private userClient: ClientProxy,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
    @Inject(HOUSE_SERVICE) private houseClient: ClientProxy,
  ) {}

  private upload = multer({
    dest: './uploads', 
  });

  async login(@Body() request: User) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.authClient.send('user_login',  request );
  
        responseObservable.subscribe({
          next: (data) => {
            console.log('Received login response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.log('test1', error)
            console.error('Error during login:', error);
            reject({ error: 'Login failed' }); 
          },
        });
      } catch (error) {
        console.log('test2')
        console.error('Error during login:', error);
        reject({ error: 'Login failed' });
      }
    });
  }

  async signup(@Body() request: User) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.authClient.send('user_signup', request );
        responseObservable.subscribe({
          next: (data) => {
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during Signup:', error);
            reject({ error: 'Signup failed' }); 
          },
        });
      }catch (error) {
        console.error('Error during Signup:', error);
        reject({ error: 'Signup failed' }); 
      }
    });
  }

  async testImageUpload(file: Express.Multer.File) {
      console.log(
        file,
        'userId1/profileImage/',
        file.originalname,
        file.mimetype,
        file.buffer,
        [{ mediaId: 'testing' }],
      );
    await this.imagesClient.emit('upload_image', file);
  }

  async createHouse(@Body() request: House, houseImages: Express.Multer.File[]) {
    return new Promise(async (resolve, reject) => {
      try {
        request.media = houseImages.map((image) => "http://localhost:3000/uploads/" + image.filename);
        const responseObservable = this.houseClient.send('create_house',  request );
        responseObservable.subscribe({
          next: (data) => {
            console.log('create_house response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during create_house:', error);
            reject({ error: 'create_house failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during create_house:', error);
        reject({ error: 'create_house failed' });
      }
    });
  }

  async findAllHouse(@Body() filters: Record<string, any>) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.houseClient.send('find_all_houses', filters);
        responseObservable.subscribe({
          next: (data) => {
            console.log('find_all_houses response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during find_all_houses:', error);
            reject({ error: 'find_all_houses failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during find_all_houses:', error);
        reject({ error: 'find_all_houses failed' });
      }
    });
  }

  async findHouseById(@Body() id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.houseClient.send('find_house_by_id', id);
        responseObservable.subscribe({
          next: (data) => {
            console.log('find_house_by_id response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during find_house_by_id:', error);
            reject({ error: 'find_house_by_id failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during find_house_by_id:', error);
        reject({ error: 'find_house_by_id failed' });
      }
    });
  }

  async updateHouseById(@Body() data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.houseClient.send('update_house_by_id', data);
        responseObservable.subscribe({
          next: (data) => {
            console.log('update_house_by_id response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during update_house_by_id:', error);
            reject({ error: 'update_house_by_id failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during update_house_by_id:', error);
        reject({ error: 'update_house_by_id failed' });
      }
    });
  }

  async deleteHouseById(@Body() id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.houseClient.send('delete_house_by_id', id);
        responseObservable.subscribe({
          next: (data) => {
            console.log('delete_house_by_id response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during delete_house_by_id:', error);
            reject({ error: 'delete_house_by_id failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during delete_house_by_id:', error);
        reject({ error: 'delete_house_by_id failed' });
      }
    });
  }

  async findBySellerId(@Body() seller_id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.houseClient.send('find_by_seller_id', seller_id);
        responseObservable.subscribe({
          next: (data) => {
            console.log('find_by_seller_id response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during find_by_seller_id:', error);
            reject({ error: 'find_by_seller_id failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during find_by_seller_id:', error);
        reject({ error: 'find_by_seller_id failed' });
      }
    });
  }

  async get_all_users(@Body() filters: Record<string, any>) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.userClient.send('get_all_users', filters);
        responseObservable.subscribe({
          next: (data) => {
            console.log('get_all_users response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during get_all_users:', error);
            reject({ error: 'get_all_users failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during get_all_users:', error);
        reject({ error: 'get_all_users failed' });
      }
    });
  }

  async find_user_by_id(@Body() id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.userClient.send('find_user_by_id', id);
        responseObservable.subscribe({
          next: (data) => {
            console.log('find_user_by_id response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during find_user_by_id:', error);
            reject({ error: 'find_user_by_id failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during find_user_by_id:', error);
        reject({ error: 'find_user_by_id failed' });
      }
    });
  }

  async updateUserById(@Body() data: any, userProfileImage: Express.Multer.File) {
    if(userProfileImage){
      data.profile_image =  "http://localhost:3000/uploads/" + userProfileImage.filename;
    }
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.userClient.send('update_user_by_id', data);
        responseObservable.subscribe({
          next: (data) => {
            console.log('update_user_by_id response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during update_user_by_id:', error);
            reject({ error: 'update_user_by_id failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during update_user_by_id:', error);
        reject({ error: 'update_user_by_id failed' });
      }
    });
  }

  async deleteUserById(@Body() id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.userClient.send('delete_user_by_id', id);
        responseObservable.subscribe({
          next: (data) => {
            console.log('delete_user_by_id response:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('Error during delete_user_by_id:', error);
            reject({ error: 'delete_user_by_id failed' }); 
          },
        });
      } catch (error) {
        console.error('Error during delete_user_by_id:', error);
        reject({ error: 'delete_user_by_id failed' });
      }
    });
  }

  async view_req_inc(@Body() id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.houseClient.send('view_req_inc', id);
        responseObservable.subscribe({
          next: (data) => {
            console.log('view request sent successfully:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('view request cannot be sent this time:', error);
            reject({ error: 'view request cannot be sent this time' }); 
          },
        });
      } catch (error) {
        console.error('view request cannot be sent this time:', error);
        reject({ error: 'view request cannot be sent this time' });
      }
    });
  }

  async view_req_dec(@Body() id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const responseObservable = this.houseClient.send('view_req_dec', id);
        responseObservable.subscribe({
          next: (data) => {
            console.log('view request cancelled:', data);
            resolve(data); 
          },
          error: (error) => {
            console.error('view request cannot be cancelled this time:', error);
            reject({ error: 'view request cannot be cancelled this time' }); 
          },
        });
      } catch (error) {
        console.error('view request cannot be cancelled this time:', error);
        reject({ error: 'view request cannot be cancelled this time' });
      }
    });
  }

}
