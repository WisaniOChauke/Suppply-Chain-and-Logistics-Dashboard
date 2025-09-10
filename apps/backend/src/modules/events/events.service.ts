import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';
import { WebSocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private websocketGateway: WebSocketGateway,
  ) {}

  async create(eventData: Partial<Event>): Promise<Event> {
    const event = this.eventsRepository.create(eventData);
    const savedEvent = await this.eventsRepository.save(event);
    
    // Broadcast real-time update
    this.websocketGateway.broadcastShipmentUpdate(eventData.shipmentId, savedEvent);
    
    return savedEvent;
  }

  async findByShipment(shipmentId: string): Promise<Event[]> {
    return this.eventsRepository.find({
      where: { shipmentId },
      order: { timestamp: 'ASC' },
    });
  }

  async getRecentEvents(limit: number = 50): Promise<Event[]> {
    return this.eventsRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}