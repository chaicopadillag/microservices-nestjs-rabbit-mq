import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RefundModule } from './refund.module';
import { Transport } from '@nestjs/microservices';
import { NewrelicInterceptor } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(RefundModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'refund',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalInterceptors(new NewrelicInterceptor());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //   }),
  // );

  // await app.listen(3000, () => console.log(`MS Refund running on port 3000`));
  await app.listen();
}
bootstrap();
