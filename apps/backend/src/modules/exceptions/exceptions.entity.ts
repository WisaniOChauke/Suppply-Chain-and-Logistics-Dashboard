import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('exceptions')
@Index(['shipmentId', 'status'])
@Index(['priority', 'status'])
export class Exception {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  shipmentId: string;

  @Column({
    type: 'enum',
    enum: ['DELAY', 'CUSTOMS_HOLD', 'WEATHER', 'MECHANICAL', 'DOCUMENTATION', 'SECURITY', 'OTHER']
  })
  type: string;

  @Column({
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM'
  })
  priority: string;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
    default: 'OPEN'
  })
  status: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  assignedTo: string;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}