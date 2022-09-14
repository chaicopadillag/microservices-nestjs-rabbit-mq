import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REFUND_SERVICE } from './constants';
import { fileNameHelper } from './helpers';
import { AwsService } from './services';

import * as rewrelice from 'newrelic';

@Injectable()
export class FilesService {
  constructor(
    @Inject(REFUND_SERVICE) private client: ClientProxy,
    private readonly awsService: AwsService,
  ) {}

  async uploadRefundsFile(file: Express.Multer.File) {
    try {
      const fileName = fileNameHelper(file);

      const payload = await this.awsService.uploadFile(file.buffer, fileName);

      if (payload?.url) {
        this.client.emit('upload_refunds', payload);
      }

      return payload;
    } catch (error) {
      rewrelice.noticeError(error);
    }
  }
}
