import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NOTIFICATION_SERVICE } from 'apps/notification/src/constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/user/.env' }),
    RmqModule.registerRmq({ name: NOTIFICATION_SERVICE }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
