import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Watch, WatchSchema } from './schemas/watch.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.MONGODB_URL),
  MongooseModule.forFeature([{ name: Watch.name, schema: WatchSchema }]),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
