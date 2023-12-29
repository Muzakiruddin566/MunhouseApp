import { Controller } from '@nestjs/common';
import { Ctx, EventPattern ,Payload, RmqContext } from '@nestjs/microservices';
import { fileData } from './constants/constants';
import { ImagesService } from './images.service';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @EventPattern('upload_image')
  async uploadImage(
    @Payload() fileData: fileData,
  ) {
    await this.imagesService.save(
        fileData.path,
        fileData.fileName,
        fileData.file
    );

  }
}
