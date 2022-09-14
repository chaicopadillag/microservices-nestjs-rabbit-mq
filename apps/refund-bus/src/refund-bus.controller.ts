import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PayloadRefundType, RefundBusService } from './refund-bus.service';

@Controller()
export class RefundBusController {
  constructor(private readonly refundBusService: RefundBusService) {}

  @MessagePattern('new_refund')
  async getMessage(
    @Payload() payload: PayloadRefundType,
    @Ctx() context: RmqContext,
  ) {
    console.log(`${context.getPattern()}`);

    await this.refundBusService.procesarDevolucion(payload);
  }
}
