import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PayloadRefundType, RefundBusService } from './refund-bus.service';

import * as rewrelice from 'newrelic';

@Controller()
export class RefundBusController {
  constructor(private readonly refundBusService: RefundBusService) {}

  @MessagePattern('new_refund')
  async getNewRefund(
    @Payload() payload: PayloadRefundType,
    @Ctx() context: RmqContext,
  ) {
    return rewrelice.startBackgroundTransaction(
      'initStartTransaction',
      async () => {
        await this.refundBusService.procesarDevolucion(payload);
      },
    );
    // console.log(`${context.getPattern()}`);
  }
}
