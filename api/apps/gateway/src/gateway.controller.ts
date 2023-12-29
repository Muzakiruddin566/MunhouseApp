import { User } from '@app/common/schemas/user.schema';
import { House } from '@app/common/schemas/house.schema';
import { Body, Controller, Get, Post, UploadedFiles, UploadedFile, UseInterceptors, Param, Query, Patch, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard, ROLES_KEY } from './user-role.guard';
import { UserRole } from './user-roles.enum';


@Controller('api')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('signup')
  async Usersignup(@Body() request: User ): Promise<any> {
    const reponse =this.gatewayService.signup(request);
    return reponse;
  }

  @Post('login')
  async Userlogin(@Body() request: User): Promise<any> {
    const reponse = await this.gatewayService.login(request);
    return reponse;
  }

  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @SetMetadata(ROLES_KEY, [UserRole.Seller, UserRole.Admin])
  @Post('house')
  @UseInterceptors(FilesInterceptor('houseImages', 5, {
    fileFilter: (_, file, callback) => {
      const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error('Invalid file type'), false);
      }
    },}
   ))
  async createHouse(@Body() request: House, @UploadedFiles() houseImages: Express.Multer.File[]): Promise<any> {
    const reponse = await this.gatewayService.createHouse(request, houseImages);
    return reponse;
  }

  @Get('house')
  async find_all_houses(@Query() filters: Record<string, any>): Promise<any> {
    const reponse = await this.gatewayService.findAllHouse(filters);
    return reponse;
  }

  @Get('house/:id')
  async find_house_by_id(@Param('id') id: string): Promise<any> {
    const reponse = await this.gatewayService.findHouseById(id);
    return reponse;
  }

  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @SetMetadata(ROLES_KEY, [UserRole.Seller, UserRole.Buyer])
  @Get('house/send_view_req/:id')
  async send_view_req(@Param('id') id: string): Promise<any> {
    const reponse = await this.gatewayService.view_req_inc(id);
    return reponse;
  }

  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @SetMetadata(ROLES_KEY, [UserRole.Seller, UserRole.Buyer])
  @Get('house/cancel_view_req/:id')
  async cancel_view_req(@Param('id') id: string): Promise<any> {
    const reponse = await this.gatewayService.view_req_dec(id);
    return reponse;
  }

  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @SetMetadata(ROLES_KEY, [UserRole.Seller, UserRole.Admin])
  @Patch('house/:id')
  async update_house_by_id(@Param('id') id: string, @Body() request: any): Promise<any> {
    request.id = id;
    const reponse = await this.gatewayService.updateHouseById(request);
    return reponse;
  }

  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @SetMetadata(ROLES_KEY, [UserRole.Seller, UserRole.Admin])
  @Delete('house/:id')
  async delete_house_by_id(@Param('id') id: string): Promise<any> {
    const reponse = await this.gatewayService.deleteHouseById(id);
    return reponse;
  }

  @Get('find_house_by_seller_id/:seller_id')
  async find_by_seller_id(@Param('seller_id') seller_id: string): Promise<any> {
    const reponse = await this.gatewayService.findBySellerId(seller_id);
    return reponse;
  }

  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @SetMetadata(ROLES_KEY, [UserRole.Seller, UserRole.Admin])
  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  async testImageUpload(@UploadedFile() file: Express.Multer.File) {
    await this.gatewayService.testImageUpload(file);
  }

  @UseGuards(AuthGuard('jwt'), UserRoleGuard)
  @SetMetadata(ROLES_KEY, [UserRole.Admin])
  @Get('user')
  async get_all_users(@Query() filters: Record<string, any>): Promise<any> {
    const reponse = await this.gatewayService.get_all_users(filters);
    return reponse;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:id')
  async find_user_by_id(@Param('id') id: string): Promise<any> {
    const reponse = await this.gatewayService.find_user_by_id(id);
    return reponse;
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Patch('user/:id')
  @UseInterceptors(FileInterceptor('userProfileImage',{
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    },}
  ))
  async update_user_by_id(@Param('id') id: string, @Body() request: any, @UploadedFile() userProfileImage: Express.Multer.File): Promise<any> {
    request.id = id;
    const reponse = await this.gatewayService.updateUserById(request, userProfileImage);
    return reponse;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('user/:id')
  async delete_user_by_id(@Param('id') id: string): Promise<any> {
    const reponse = await this.gatewayService.deleteUserById(id);
    return reponse;
  }
  
}
