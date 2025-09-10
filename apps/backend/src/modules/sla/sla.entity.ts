import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('slas')
export class SLA {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int')
  thresholdHours: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('sla_breaches')
export class SLABreach {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shipmentId: string;

  @Column()
  slaId: string;

  @Column({
    type: 'enum',
    enum: ['ON_TIME', 'AT_RISK', 'BREACHED'],
    default: 'ON_TIME'
  })
  status: string;

  @Column({ type: 'timestamp' })
  expectedTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualTime: Date;

  @Column('int', { nullable: true })
  delayHours: number;

  @Column('int', { default: 0 })
  riskScore: number;

  @CreateDateColumn()
  createdAt: Date;
}