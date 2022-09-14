import { NewrelicInterceptor } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';

async function bootstrap() {
  const app = await NestFactory.create(FilesModule);
  app.useGlobalInterceptors(new NewrelicInterceptor());
  await app.listen(4000, () => {
    console.log('App files run on port: 4000');
  });
}
bootstrap();
