import { Injectable, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { House } from '../../../libs/common/src/schemas/house.schema';
import { User } from '../../../libs/common/src/schemas/user.schema';


@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House.name) private houseModel: Model<House>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(house: Partial<House>): Promise<any> {
    const houseDetails = await this.houseModel.findOne({address: house.address})
    const userDetails =  await this.userModel.findById(house.seller)
    if(houseDetails){
      return {
        error: 'House already exist with the same address',
        status: HttpStatus.BAD_REQUEST,
      };
    }
    if(!userDetails){
      return {
        error: 'Seller not found',
        status: HttpStatus.BAD_REQUEST,
      };
    }
    const createdHouse = (await this.houseModel.create(house)).populate('seller')
    return createdHouse
  }

  async find( filters: Record<string, any>): Promise<House[]> {
    const query = {};

    if (filters.no_of_washrooms) {
      query['no_of_washrooms'] = filters.no_of_washrooms;
    }

    if (filters.no_of_bedrooms) {
      query['no_of_bedrooms'] = filters.no_of_bedrooms;
    }

    if (filters.no_of_view_request) {
      query['no_of_view_request'] = filters.no_of_view_request;
    }

    if (filters.areaFrom && filters.areaTo) {
      query['area'] = { $gte: filters.areaFrom, $lte: filters.areaTo };
    } else if (filters.areaFrom) {
      query['area'] = { $gte: filters.areaFrom };
    } else if (filters.areaTo) {
      query['area'] = { $lte: filters.areaTo };
    }

    if (filters.priceFrom && filters.priceTo) {
      query['price'] = { $gte: filters.priceFrom, $lte: filters.priceTo };
    } else if (filters.priceFrom) {
      query['price'] = { $gte: filters.priceFrom };
    } else if (filters.priceTo) {
      query['price'] = { $lte: filters.priceTo };
    }

    if (filters.address) {
      query['address'] = filters.address;
    }

    if (filters.status) {
      query['status'] = filters.status;
    }

    if (filters.seller) {
      query['seller'] = filters.seller;
    }

    let houseDetails: any = await this.houseModel.find(query).populate('seller').exec();

    return houseDetails;
  }

  async findById(id: string): Promise<any> {
    const houseDetails = await this.houseModel.findById(id).populate('seller').exec()
    if(!houseDetails){
      return {
        error: 'House not Found, with the given Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return houseDetails;
  }

  async updateById(data: any): Promise<any> {
    const id = data.id
    delete data.id;
    let houseDetails = await this.houseModel.findById(id).populate('seller').exec()
    if(!houseDetails){
      return {
        error: 'House not Found, with the given Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
    await this.houseModel.findByIdAndUpdate(id, data).populate('seller').exec()
    houseDetails = await this.houseModel.findById(id).populate('seller').exec()
    return houseDetails;
  }


  async deleteById(id: string): Promise<any> {
    let houseDetails = await this.houseModel.findById(id).populate('seller').exec()
    if(!houseDetails){
      return {
        error: 'House not Found, with the given Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
    try{
      await this.houseModel.findByIdAndDelete(id).populate('seller').exec()
      return {
        success: true,
        msg: 'House deleted with success'
      }
    }catch(error){
       return {
         error: 'House cannot be deleted',
         status: HttpStatus.UNPROCESSABLE_ENTITY,
       }
    }
  }

  async findBySellerId(sellerId: string): Promise<any> {
    const houseDetails = await this.houseModel.find({ seller: sellerId }).populate('seller').exec()
    if(houseDetails.length <= 0){
      return {
        error: 'House not Found, with the given seller Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return houseDetails;
  }

  async incViewReqById(id: string): Promise<any> {
    let houseDetails = await this.houseModel.findById(id).populate('seller').exec()
    if(!houseDetails){
      return {
        error: 'House not Found, with the given Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
    await this.houseModel.findByIdAndUpdate(id, {$inc: {no_of_view_request: 1}}).populate('seller').exec()
    houseDetails = await this.houseModel.findById(id).populate('seller').exec()
    return houseDetails;
  }

  async decViewReqById(id: string): Promise<any> {
    let houseDetails = await this.houseModel.findById(id).populate('seller').exec()
    if(!houseDetails){
      return {
        error: 'House not Found, with the given Id',
        status: HttpStatus.NOT_FOUND,
      };
    }
    if(houseDetails.no_of_view_request <= 0){
      return {
        error: 'There is no request to cancel',
        status: HttpStatus.NOT_FOUND,
      };
    }
    await this.houseModel.findByIdAndUpdate(id, {$inc: {no_of_view_request: -1}}).populate('seller').exec()
    houseDetails = await this.houseModel.findById(id).populate('seller').exec()
    return houseDetails;
  }

}
