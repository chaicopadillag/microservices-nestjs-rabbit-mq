import { Injectable } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ReadFileService } from '../services';

@Injectable()
export class RefundRbMqController {
  constructor(private readonly readFileService: ReadFileService) {}

  @MessagePattern('upload_refunds')
  async getMessage(
    @Payload() payload: { key: string; url: string },
    @Ctx() context: RmqContext,
  ) {
    console.log(`${context.getPattern()}`);

    await this.readFileService.enviarColaDevolucion(payload);
  }
}
