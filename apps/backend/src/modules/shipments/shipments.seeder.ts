import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipments.entity';
import { Event } from '../events/events.entity';

@Injectable()
export class ShipmentsSeeder {
  constructor(
    @InjectRepository(Shipment)
    private shipmentsRepository: Repository<Shipment>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async seed() {
    const existingCount = await this.shipmentsRepository.count();
    if (existingCount > 0) return;

    const locations = {
      shanghai: {
        id: 'loc-cnsha',
        name: 'Shanghai Port',
        code: 'CNSHA',
        type: 'PORT',
        coordinates: { lat: 31.2304, lng: 121.4737 },
        timezone: 'Asia/Shanghai',
      },
      losAngeles: {
        id: 'loc-uslax',
        name: 'Los Angeles Port',
        code: 'USLAX',
        type: 'PORT',
        coordinates: { lat: 33.7361, lng: -118.2922 },
        timezone: 'America/Los_Angeles',
      },
      hamburg: {
        id: 'loc-deham',
        name: 'Hamburg Port',
        code: 'DEHAM',
        type: 'PORT',
        coordinates: { lat: 53.5511, lng: 9.9937 },
        timezone: 'Europe/Berlin',
      },
    };

    const shipments = [
      {
        orderNumber: 'ORD-2024-001',
        containerNumber: 'MSKU-123456-7',
        status: 'IN_TRANSIT',
        origin: locations.shanghai,
        destination: locations.losAngeles,
        estimatedDeparture: new Date('2024-01-10T08:00:00Z'),
        estimatedArrival: new Date('2024-01-25T14:00:00Z'),
        carrier: 'Maersk Line',
        mode: 'OCEAN',
      },
      {
        orderNumber: 'ORD-2024-002',
        status: 'EXCEPTION',
        origin: locations.hamburg,
        destination: locations.losAngeles,
        estimatedDeparture: new Date('2024-01-08T10:00:00Z'),
        estimatedArrival: new Date('2024-01-22T16:00:00Z'),
        carrier: 'MSC',
        mode: 'OCEAN',
      },
    ];

    const savedShipments = await this.shipmentsRepository.save(shipments);

    // Create events for first shipment
    const events = [
      {
        shipmentId: savedShipments[0].id,
        type: 'CREATED',
        timestamp: new Date('2024-01-08T00:00:00Z'),
        description: 'Shipment created and booking confirmed',
        location: locations.shanghai,
      },
      {
        shipmentId: savedShipments[0].id,
        type: 'LOADED',
        timestamp: new Date('2024-01-10T06:00:00Z'),
        description: 'Container loaded onto vessel MV Ever Given',
        location: locations.shanghai,
      },
      {
        shipmentId: savedShipments[0].id,
        type: 'DEPARTED',
        timestamp: new Date('2024-01-10T08:00:00Z'),
        description: 'Vessel departed Shanghai Port',
        location: locations.shanghai,
      },
    ];

    await this.eventsRepository.save(events);
  }
}