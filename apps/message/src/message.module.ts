import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NOTIFICATION_SERVICE } from 'apps/notification/src/constants';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/message/.env',
    }),
    RmqModule.registerRmq({ name: NOTIFICATION_SERVICE }),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
