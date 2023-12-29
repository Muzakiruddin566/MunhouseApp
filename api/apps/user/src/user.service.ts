import { Injectable, HttpStatus } from '@nestjs/common';
import { User } from "../../../libs/common/src/schemas/user.schema";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async find( filters: Record<string, any>): Promise<User[]> {
    const query = {};

    if (filters.role) {
      query['role'] = filters.role;
    }

    if (filters.email) {
      query['email'] = filters.email;
    }

    if (filters.address) {
      query['address'] = filters.address;
    }

    if (filters.contact) {
      query['contact'] = filters.contact;
    }

    if (filters.first_name) {
      query['first_name'] = filters.first_name;
    }

    if (filters.last_name) {
      query['last_name'] = filters.last_name;
    }

    const houseDetails = await this.userModel.find(query).exec();
    return houseDetails;
  }

  async findById(id: string): Promise<any> {
    const userDetails = await this.userModel.findById(id).exec()
    if(!userDetails){
      return {
        error: 'User not Found, with the given Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return userDetails;
  }

  async updateById(data: any): Promise<any> {
    const id = data.id
    delete data.id;
    if(data.email){
      const Details = await this.userModel.findOne({email: data.email}).exec()
      if(Details){
        return {
          error: 'User already exist with the given Email',
          status: HttpStatus.BAD_REQUEST,
        };
      }
    }
    let userDetails = await this.userModel.findById(id).exec()
    if(data.password){
      const saltRounds = 10; 
      const salt = await bcrypt.genSalt(saltRounds); 
      const hashedPassword = await bcrypt.hash(data.password, salt); 
      data.password = hashedPassword;
    }
    if(!userDetails){
      return {
        error: 'User not Found, with the given Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
     await this.userModel.findByIdAndUpdate(id, data).exec()
     userDetails = await this.userModel.findById(id).exec()
    return userDetails;
  }

  async deleteById(id: string): Promise<any> {
    let userDetails = await this.userModel.findById(id).exec()
    if(!userDetails){
      return {
        error: 'User not Found, with the given Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
    try{
      await this.userModel.findByIdAndDelete(id).exec()
      return {
        success: true,
        msg: 'User deleted with success'
      }
    }catch(error){
       return {
         error: 'User cannot be deleted',
         status: HttpStatus.UNPROCESSABLE_ENTITY,
       }
    }
  }

}
