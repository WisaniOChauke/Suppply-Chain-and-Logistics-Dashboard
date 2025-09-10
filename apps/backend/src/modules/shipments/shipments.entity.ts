import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderNumber: string;

  @Column({ nullable: true })
  containerNumber: string;

  @Column({
    type: 'enum',
    enum: ['CREATED', 'PICKED', 'CONSOLIDATED', 'LOADED', 'DEPARTED', 'IN_TRANSIT', 'ARRIVED', 'CLEARED', 'DELIVERED', 'EXCEPTION'],
    default: 'CREATED'
  })
  status: string;

  @Column('jsonb')
  origin: {
    id: string;
    name: string;
    code: string;
    type: string;
    coordinates: { lat: number; lng: number };
    timezone: string;
  };

  @Column('jsonb')
  destination: {
    id: string;
    name: string;
    code: string;
    type: string;
    coordinates: { lat: number; lng: number };
    timezone: string;
  };

  @Column({ type: 'timestamp' })
  estimatedDeparture: Date;

  @Column({ type: 'timestamp' })
  estimatedArrival: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualDeparture: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualArrival: Date;

  @Column()
  carrier: string;

  @Column({
    type: 'enum',
    enum: ['OCEAN', 'AIR', 'RAIL', 'TRUCK']
  })
  mode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}