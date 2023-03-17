import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn({ type: 'int', name: 'device_id' })
  id: number;

  /**
   * The name of the device, set by the user.
   */
  @Column({ name: 'device_name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_updated_at' })
  lastUpdatedAt: Date;
}
