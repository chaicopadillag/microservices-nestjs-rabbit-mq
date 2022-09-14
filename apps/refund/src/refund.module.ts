import { HttpClientService } from '@app/common';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
    ClientsModule.register([
      {
        name: 'REFUND_BUS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'refund_bus',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [RefundController, RefundRbMqController],
  providers: [RefundService, AwsService, ReadFileService],
})
export class RefundModule {}
