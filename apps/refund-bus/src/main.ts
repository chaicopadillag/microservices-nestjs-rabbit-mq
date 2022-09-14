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
  app.useGlobalInterceptors(new NewrelicInterceptor());

  await app.listen();
}
bootstrap();
