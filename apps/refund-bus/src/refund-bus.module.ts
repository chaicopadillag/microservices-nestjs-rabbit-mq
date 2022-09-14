import {
  HttpClientService,
  REFUND_QUEUE,
  REFUND_SERVICE,
  RmqModule,
} from '@app/common';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RefundBusController } from './refund-bus.controller';
import { RefundBusService } from './refund-bus.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/refund-bus/.env',
    }),
    HttpModule.registerAsync({
      useClass: HttpClientService,
    }),
    RmqModule.registerRmq({ name: REFUND_SERVICE, queue: REFUND_QUEUE }),
  ],
  controllers: [RefundBusController],
  providers: [RefundBusService],
})
export class RefundBusModule {}
