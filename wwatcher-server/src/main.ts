import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Initializing Nest Application...');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT,'0.0.0.0');
}

bootstrap();
