import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('eta_forecasts')
@Index(['shipmentId', 'createdAt'])
export class ETAForecast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  shipmentId: string;

  @Column({ type: 'timestamp' })
  originalETA: Date;

  @Column({ type: 'timestamp' })
  predictedETA: Date;

  @Column('int')
  confidence: number;

  @Column('int')
  delayMinutes: number;

  @Column('simple-array')
  factors: string[];

  @Column()
  modelVersion: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('risk_assessments')
@Index(['shipmentId', 'createdAt'])
export class RiskAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  shipmentId: string;

  @Column('int')
  overallRisk: number;

  @Column({
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
  })
  riskLevel: string;

  @Column('json')
  factors: any[];

  @Column('simple-array')
  recommendations: string[];

  @Column({ type: 'timestamp' })
  nextReview: Date;

  @CreateDateColumn()
  createdAt: Date;
}