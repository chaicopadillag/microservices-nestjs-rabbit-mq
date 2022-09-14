import { NestFactory } from '@nestjs/core';
import { MessageModule } from './message.module';

async function bootstrap() {
  const app = await NestFactory.create(MessageModule);
  await app.listen(4000, () => {
    console.log('on port 4000');
  });
}
bootstrap();
