import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';

@Controller('exceptions')
export class ExceptionsController {
  constructor(private readonly exceptionsService: ExceptionsService) {}

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('assignedTo') assignedTo?: string,
  ) {
    return this.exceptionsService.findAll({ status, priority, assignedTo });
  }

  @Get('work-queue/:role')
  async getWorkQueue(
    @Param('role') role: string,
    @Query('userId') userId?: string,
  ) {
    return this.exceptionsService.getWorkQueue(role, userId);
  }

  @Post()
  async create(@Body() exceptionData: any) {
    return this.exceptionsService.create(exceptionData);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateData: { status: string; assignedTo?: string },
  ) {
    return this.exceptionsService.updateStatus(id, updateData.status, updateData.assignedTo);
  }
}