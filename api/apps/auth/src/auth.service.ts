import { User } from '@app/common/schemas/user.schema';
import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findByEmail(username);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(username: string, password: string) {
    let user: any = await this.validateUser(username, password);
    if (user) {
      user = user._doc
      const payload = { sub: user._id, username: user.email, role: user.role };
      const jwtToken = this.jwtService.sign(payload)
      return {
        success: true,
        user: user,
        access_token: jwtToken,
    }
  }
      return {
        error: 'Invalid Credentials',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
  }


  async signup(user: User) {
    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds); 
    const hashedPassword = await bcrypt.hash(user.password, salt); 
    user.password = hashedPassword;
    const session = await this.userRepository.startTransaction();
    try {
      const User = await this.userRepository.findByEmail(user.email)
      if(User){
        return {
          error: 'User with the email already exists',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const result: any = await this.userRepository.create(user, { session });
      if (result) {
        let payload = { sub: result._id, username: result.email, role: result.role };
        payload = {
          ...payload,
          sub: payload.sub.toString()
        };
        const jwtToken = this.jwtService.sign(payload)
        await session.commitTransaction();
        return {
          success: true,
          user: result,
          access_token: jwtToken,
        }
      }
      return {
        error: 'Cannot Create User',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}

