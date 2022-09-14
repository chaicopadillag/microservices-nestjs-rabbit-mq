import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { fileNameHelper } from './helpers';
import { AwsService } from './services';

import * as rewrelice from 'newrelic';
import { REFUND_SERVICE } from '@app/common';

@Injectable()
export class FilesService {
  constructor(
    @Inject(REFUND_SERVICE) private client: ClientProxy,
    private readonly awsService: AwsService,
  ) {}

  async uploadRefundsFile(file: Express.Multer.File) {
    try {
      const fileName = fileNameHelper(file);

      // const payload = await this.awsService.uploadFile(file.buffer, fileName);

      // if (payload?.url) {
      //   this.client.emit('upload_refunds', payload);
      // }

      // return payload;

      this.client.emit('upload_refunds', { key: fileName });

      return { message: 'upload' };
    } catch (error) {
      rewrelice.noticeError(error);
    }
  }
}
