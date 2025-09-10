import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exception } from './exceptions.entity';
import { WebSocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class ExceptionsService {
  constructor(
    @InjectRepository(Exception)
    private exceptionsRepository: Repository<Exception>,
    private websocketGateway: WebSocketGateway,
  ) {}

  async create(exceptionData: Partial<Exception>): Promise<Exception> {
    const exception = this.exceptionsRepository.create(exceptionData);
    const saved = await this.exceptionsRepository.save(exception);
    
    // Broadcast real-time update
    this.websocketGateway.broadcastShipmentUpdate(exceptionData.shipmentId, {
      type: 'exception_created',
      exception: saved
    });
    
    return saved;
  }

  async findAll(filters: { status?: string; priority?: string; assignedTo?: string }) {
    const query = this.exceptionsRepository.createQueryBuilder('exception');
    
    if (filters.status) {
      query.andWhere('exception.status = :status', { status: filters.status });
    }
    if (filters.priority) {
      query.andWhere('exception.priority = :priority', { priority: filters.priority });
    }
    if (filters.assignedTo) {
      query.andWhere('exception.assignedTo = :assignedTo', { assignedTo: filters.assignedTo });
    }
    
    return query.orderBy('exception.createdAt', 'DESC').getMany();
  }

  async updateStatus(id: string, status: string, assignedTo?: string): Promise<Exception> {
    const updateData: any = { status };
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (status === 'RESOLVED' || status === 'CLOSED') {
      updateData.resolvedAt = new Date();
    }
    
    await this.exceptionsRepository.update(id, updateData);
    return this.exceptionsRepository.findOne({ where: { id } });
  }

  async getWorkQueue(role: string, userId?: string) {
    const query = this.exceptionsRepository.createQueryBuilder('exception')
      .where('exception.status IN (:...statuses)', { statuses: ['OPEN', 'IN_PROGRESS'] });
    
    if (role === 'OPERATOR' && userId) {
      query.andWhere('(exception.assignedTo = :userId OR exception.assignedTo IS NULL)', { userId });
    }
    
    return query
      .orderBy('exception.priority', 'DESC')
      .addOrderBy('exception.createdAt', 'ASC')
      .getMany();
  }
}