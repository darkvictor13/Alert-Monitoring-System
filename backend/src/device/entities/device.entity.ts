import { Alert } from 'src/alert/entities/alert.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Must have a unique name for each user.
 */
@Entity()
@Unique(['name', 'user'])
export class Device {
  @PrimaryGeneratedColumn('uuid', { name: 'device_uuid' })
  uuid: string;

  @ManyToOne(() => User, (user) => user.devices)
  user: User;

  @OneToMany(() => Alert, (alert) => alert.device)
  alerts: Alert[];

  /**
   * The name of the device, set by the user.
   */
  @Column({ name: 'device_name', nullable: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_updated_at' })
  lastUpdatedAt: Date;
}
