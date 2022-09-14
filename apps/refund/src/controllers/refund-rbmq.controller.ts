import { Injectable } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PayloadRefundType } from 'apps/refund-bus/src/refund-bus.service';
import { ReadFileService } from '../services';

@Injectable()
export class RefundRbMqController {
  constructor(private readonly readFileService: ReadFileService) {}

  @MessagePattern('upload_refunds')
  async getUploadRefundQue(
    @Payload() payload: { key: string; url: string },
    @Ctx() context: RmqContext,
  ) {
    console.log(`${context.getPattern()}`);

    await this.readFileService.enviarColaDevolucionXFila(payload);
  }

  @MessagePattern('retun_refund')
  async getReturnRefund(
    @Payload() payload: PayloadRefundType,
    @Ctx() context: RmqContext,
  ) {
    console.log(`${context.getPattern()}`);

    await this.readFileService.enviarColaDevolucion(payload);
  }
}
