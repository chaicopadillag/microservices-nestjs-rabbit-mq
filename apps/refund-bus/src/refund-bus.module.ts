import { HttpClientService } from '@app/common';
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
  ],
  controllers: [RefundBusController],
  providers: [RefundBusService],
})
export class RefundBusModule {}
