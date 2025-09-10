import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsController } from './exceptions.controller';
import { ExceptionsService } from './exceptions.service';
import { Exception } from './exceptions.entity';
import { WebSocketModule } from '../websocket/websocket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exception]), WebSocketModule],
  controllers: [ExceptionsController],
  providers: [ExceptionsService],
  exports: [ExceptionsService],
})
export class ExceptionsModule {}