import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...config,
      host: '172.0.0.1', // Enable to connect to docker db container from localhost (for development)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
