import { IsString, IsOptional, IsEnum, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsEnum(['PORT', 'WAREHOUSE', 'AIRPORT', 'RAIL_TERMINAL'])
  type: string;

  @ValidateNested()
  @Type(() => Object)
  coordinates: { lat: number; lng: number };

  @IsString()
  timezone: string;
}

export class CreateShipmentDto {
  @IsString()
  orderNumber: string;

  @IsOptional()
  @IsString()
  containerNumber?: string;

  @IsEnum(['CREATED', 'PICKED', 'CONSOLIDATED', 'LOADED', 'DEPARTED', 'IN_TRANSIT', 'ARRIVED', 'CLEARED', 'DELIVERED', 'EXCEPTION'])
  @IsOptional()
  status?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  origin: LocationDto;

  @ValidateNested()
  @Type(() => LocationDto)
  destination: LocationDto;

  @IsDateString()
  estimatedDeparture: string;

  @IsDateString()
  estimatedArrival: string;

  @IsString()
  carrier: string;

  @IsEnum(['OCEAN', 'AIR', 'RAIL', 'TRUCK'])
  mode: string;
}