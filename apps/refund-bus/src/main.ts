import { NewrelicInterceptor } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { RefundBusModule } from './refund-bus.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(RefundBusModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'refund_bus',
      queueOptions: {
        durable: true,
      },
    },
  });
  // const app = await NestFactory.create(RefundBusModule);

  // const rmqService = app.get<RmqService>(RmqService);
  // app.connectMicroservice(rmqService.getOptions('REFUND_BUS'));

  app.useGlobalInterceptors(new NewrelicInterceptor());

  // await app.startAllMicroservices();

  await app.listen();
}
bootstrap();
