import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AlertType } from 'types/alert';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn({ type: 'int', name: 'alert_id' })
  id: number;

  @Column({ type: 'enum', enum: AlertType, name: 'type' })
  type: AlertType;

  @Column({ type: 'json', name: 'data' })
  data: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_updated_at' })
  lastUpdatedAt: Date;
}
