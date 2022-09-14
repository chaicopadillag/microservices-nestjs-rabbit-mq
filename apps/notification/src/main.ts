import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions('NOTIFICATION', true),
  );
  await app.startAllMicroservices();

  await app.listen(3000, () => {
    console.log('on port 3000');
  });
}
bootstrap();
