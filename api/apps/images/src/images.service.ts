import { Injectable } from '@nestjs/common';

import { Bucket, Storage } from '@google-cloud/storage';
import StorageConfig from './config';

@Injectable()
export class ImagesService {
  private storage: Storage;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key,
      },
    });

    this.bucket = this.storage.bucket(StorageConfig.mediaBucket);
  }

  async save(path: string, filename: string, file: any) {
    const fileName = path + filename;
    const fileArray = this.toArrayBuffer(file.buffer?.data);

    const blob = this.bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on('finish', () => {
        console.log('success');
      })
      .on('error', () => {
        console.log(`Unable to upload image, something went wrong`);
      })
      .end(fileArray);
  }
  toArrayBuffer(buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return view;
  }
}
