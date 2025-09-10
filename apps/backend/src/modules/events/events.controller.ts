import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('recent')
  async getRecentEvents(@Query('limit') limit: number = 50) {
    return this.eventsService.getRecentEvents(limit);
  }

  @Get('shipment/:shipmentId')
  async getShipmentEvents(@Param('shipmentId') shipmentId: string) {
    return this.eventsService.findByShipment(shipmentId);
  }

  @Post()
  async createEvent(@Body() eventData: any) {
    return this.eventsService.create(eventData);
  }
}