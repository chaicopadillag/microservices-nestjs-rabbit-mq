import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { REFUND_SERVICE } from './constants';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { AwsService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/files/.env' }),
    RmqModule.registerRmq({ name: REFUND_SERVICE }),
  ],
  controllers: [FilesController],
  providers: [FilesService, AwsService],
})
export class FilesModule {}
