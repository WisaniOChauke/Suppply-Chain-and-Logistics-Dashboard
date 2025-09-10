import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { Shipment } from './shipments.entity';
import { ShipmentsSeeder } from './shipments.seeder';
import { Event } from '../events/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Event])],
  controllers: [ShipmentsController],
  providers: [ShipmentsService, ShipmentsSeeder],
  exports: [ShipmentsService, ShipmentsSeeder],
})
export class ShipmentsModule {}