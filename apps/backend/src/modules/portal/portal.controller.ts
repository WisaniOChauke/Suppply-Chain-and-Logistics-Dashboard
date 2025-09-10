import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PortalService } from './portal.service';

@Controller('portal')
export class PortalController {
  constructor(private readonly portalService: PortalService) {}

  @Get('supplier/:tenantId/dashboard')
  async getSupplierDashboard(@Param('tenantId') tenantId: string) {
    return this.portalService.getSupplierDashboard(tenantId);
  }

  @Get('customer/:tenantId/dashboard')
  async getCustomerDashboard(@Param('tenantId') tenantId: string) {
    return this.portalService.getCustomerDashboard(tenantId);
  }

  @Get('shipments')
  async getAccessibleShipments(
    @Query('userId') userId: string,
    @Query('role') role: string,
    @Query('tenantId') tenantId?: string,
  ) {
    return this.portalService.getAccessibleShipments(userId, role, tenantId);
  }

  @Post('tenant')
  async createTenant(@Body() tenantData: any) {
    return this.portalService.createTenant(tenantData);
  }

  @Post('user')
  async createUser(@Body() userData: any) {
    return this.portalService.createPortalUser(userData);
  }
}