import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from '@app/common/schemas/user.schema';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @EventPattern('user_signup')
  user_signup(@Payload() data: User) {
    if(!data.first_name){
      return {
        error: 'First-name Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.last_name){
      return {
        error: 'Last-name Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.address){
      return {
        error: 'Address Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.email){
      return {
        error: 'Email Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.password){
      return {
        error: 'Password Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.contact){
      return {
        error: 'User contact Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }

    const response =this.authService.signup(data);
    return response
  }

  @EventPattern('user_login')
  async login(@Payload() data: User) {
    if(!data.password){
      return {
        error: 'Password Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }
    if(!data.email){
      return {
        error: 'Email Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }
    const response = await this.authService.login(data.email, data.password)
    return response
  }
}
