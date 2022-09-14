import {
  HttpClientService,
  REFUND_BUS_QUEUE,
  REFUND_BUS_SERVICE,
  RmqModule,
} from '@app/common';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RefundRbMqController } from './controllers';

import { RefundController } from './refund.controller';
import { RefundService } from './refund.service';
import { AwsService, ReadFileService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/refund/.env' }),
    HttpModule.registerAsync({
      useClass: HttpClientService,
    }),
    RmqModule.registerRmq({
      name: REFUND_BUS_SERVICE,
      queue: REFUND_BUS_QUEUE,
    }),
  ],
  controllers: [RefundController, RefundRbMqController],
  providers: [RefundService, AwsService, ReadFileService],
})
export class RefundModule {}
