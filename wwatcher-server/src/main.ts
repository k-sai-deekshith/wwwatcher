import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  console.log('In main.tsx');
  app.enableCors();

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } else {
    await app.init();
    console.log('App initialized');
  }
}

bootstrap();

export default server;