import { Device } from 'src/device/entities/device.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AlertType } from 'types/alert';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn({ type: 'int', name: 'alert_id' })
  id: number;

  @ManyToOne(() => Device, (device) => device.alerts)
  device: Device;

  @Column({ type: 'enum', enum: AlertType, name: 'type' })
  type: AlertType;

  @Column({ type: 'json', name: 'data' })
  data: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_updated_at' })
  lastUpdatedAt: Date;
}
