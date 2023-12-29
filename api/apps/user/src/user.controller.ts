import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../../libs/common/src/schemas/user.schema'
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('get_all_users')
  get_all_users(@Payload() filters: Record<string, any>) {
    const response = this.userService.find(filters);
    return response
  }

  @EventPattern('find_user_by_id')
  find_user_by_id(@Payload() id: string) {
    const response = this.userService.findById(id);
    return response
  }

  @EventPattern('update_user_by_id')
  update_user_by_id(@Payload() data: any) {
    const response = this.userService.updateById(data);
    return response
  }

  @EventPattern('delete_user_by_id')
  delete_user_by_id(@Payload() id: string) {
    const response = this.userService.deleteById(id);
    return response
  }

}

