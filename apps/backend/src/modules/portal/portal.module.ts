import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalController } from './portal.controller';
import { PortalService } from './portal.service';
import { User, Tenant } from '../auth/auth.entity';
import { Shipment } from '../shipments/shipments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tenant, Shipment])],
  controllers: [PortalController],
  providers: [PortalService],
  exports: [PortalService],
})
export class PortalModule {}