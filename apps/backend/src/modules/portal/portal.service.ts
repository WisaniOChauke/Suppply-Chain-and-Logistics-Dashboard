import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Tenant } from '../auth/auth.entity';
import { Shipment } from '../shipments/shipments.entity';

@Injectable()
export class PortalService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  async getSupplierDashboard(tenantId: string) {
    const shipments = await this.shipmentRepository.find({
      where: { supplierId: tenantId },
      order: { createdAt: 'DESC' },
      take: 50,
    });

    return {
      totalShipments: shipments.length,
      activeShipments: shipments.filter(s => s.status === 'IN_TRANSIT').length,
      onTimeDelivery: 94.2,
      avgTransitTime: '18.5 days',
      shipments: shipments.slice(0, 10),
    };
  }

  async getCustomerDashboard(tenantId: string) {
    const shipments = await this.shipmentRepository.find({
      where: { customerId: tenantId },
      order: { createdAt: 'DESC' },
      take: 50,
    });

    return {
      totalOrders: shipments.length,
      inTransit: shipments.filter(s => s.status === 'IN_TRANSIT').length,
      delivered: shipments.filter(s => s.status === 'DELIVERED').length,
      exceptions: shipments.filter(s => s.status === 'EXCEPTION').length,
      shipments: shipments.slice(0, 10),
    };
  }

  async getAccessibleShipments(userId: string, role: string, tenantId?: string) {
    const query = this.shipmentRepository.createQueryBuilder('shipment');
    
    if (role === 'SUPPLIER' && tenantId) {
      query.where('shipment.supplierId = :tenantId', { tenantId });
    } else if (role === 'CUSTOMER' && tenantId) {
      query.where('shipment.customerId = :tenantId', { tenantId });
    }
    
    return query.orderBy('shipment.createdAt', 'DESC').getMany();
  }

  async createTenant(tenantData: Partial<Tenant>): Promise<Tenant> {
    const tenant = this.tenantRepository.create(tenantData);
    return this.tenantRepository.save(tenant);
  }

  async createPortalUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
}