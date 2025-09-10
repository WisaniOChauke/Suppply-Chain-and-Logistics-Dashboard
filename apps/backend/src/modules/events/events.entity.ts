import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('events')
@Index(['shipmentId', 'timestamp'])
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  shipmentId: string;

  @Column({
    type: 'enum',
    enum: ['CREATED', 'PICKED', 'CONSOLIDATED', 'LOADED', 'DEPARTED', 'IN_TRANSIT', 'ARRIVED', 'CLEARED', 'DELIVERED', 'EXCEPTION']
  })
  type: string;

  @Column('jsonb', { nullable: true })
  location?: {
    id: string;
    name: string;
    code: string;
    type: string;
    coordinates: { lat: number; lng: number };
    timezone: string;
  };

  @Column({ type: 'timestamp' })
  @Index()
  timestamp: Date;

  @Column()
  description: string;

  @Column('jsonb', { nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}