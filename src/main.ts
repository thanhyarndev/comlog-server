import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:3000', // ✅ hoặc true nếu mở tất cả
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.listen(8386);
}
bootstrap();
