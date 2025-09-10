import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipments.entity';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentsRepository: Repository<Shipment>,
  ) {}

  async findAll(options: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = options;
    const query = this.shipmentsRepository.createQueryBuilder('shipment');
    
    if (status) {
      query.where('shipment.status = :status', { status });
    }
    
    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('shipment.updatedAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Shipment> {
    return this.shipmentsRepository.findOne({ where: { id } });
  }

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = this.shipmentsRepository.create(createShipmentDto);
    return this.shipmentsRepository.save(shipment);
  }

  async updateStatus(id: string, status: string): Promise<Shipment> {
    await this.shipmentsRepository.update(id, { status });
    return this.findOne(id);
  }
}