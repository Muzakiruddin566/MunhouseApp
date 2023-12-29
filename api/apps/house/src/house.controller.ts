import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HouseService } from './house.service';
import { House } from '@app/common/schemas/house.schema';


@Controller()
export class HouseController {
  constructor(private readonly houseService: HouseService) {
  }
  @EventPattern('create_house')
  create_house(@Payload() data: House) {
    if(!data.address){
      return {
        error: 'Address Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.price){
      return {
        error: 'Price Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.area){
      return {
        error: 'Area Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.no_of_washrooms){
      return {
        error: 'Total Number of Washrooms Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.no_of_bedrooms){
      return {
        error: 'Total Number of Bedrooms Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.seller){
      return {
        error: 'Seller-Id Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }if(!data.postal_code){
      return {
        error: 'Postal Code Required',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }
    const response = this.houseService.create(data);
    return response
  }

  @EventPattern('find_all_houses')
  find_all_houses(@Payload() filters: Record<string, any>) {
    const response = this.houseService.find(filters);
    return response
  }

  @EventPattern('find_house_by_id')
  find_house_by_id(@Payload() id: string) {
    const response = this.houseService.findById(id);
    return response
  }

  @EventPattern('update_house_by_id')
  update_house_by_id(@Payload() data: any) {
    const response = this.houseService.updateById(data);
    return response
  }

  @EventPattern('delete_house_by_id')
  delete_house_by_id(@Payload() id: string) {
    const response = this.houseService.deleteById(id);
    return response
  }

  @EventPattern('find_by_seller_id')
  find_by_seller_id(@Payload() seller_id: string) {
    const response = this.houseService.findBySellerId(seller_id);
    return response
  }

  @EventPattern('view_req_inc')
  view_req_inc(@Payload() id: string) {
    const response = this.houseService.incViewReqById(id);
    return response
  }

  @EventPattern('view_req_dec')
  view_req_dec(@Payload() id: string) {
    const response = this.houseService.decViewReqById(id);
    return response
  }

}
