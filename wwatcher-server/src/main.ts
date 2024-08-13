import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  console.log('Initializing Nest Application...');

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();

  // Log all registered routes
  const httpServer = app.getHttpAdapter().getInstance();
  httpServer._router.stack.forEach((layer) => {
    if (layer.route) {
      console.log(`Registered route: ${layer.route.path}`);
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } else {
    await app.init();
    console.log('App initialized in production mode');
  }
}

bootstrap();

export default server;
