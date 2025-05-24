import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true, // hoặc chỉ định cụ thể như 'http://localhost:3000'
    credentials: true, // ✅ BẮT BUỘC cho httpOnly cookie
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.listen(8386);
}
bootstrap();
