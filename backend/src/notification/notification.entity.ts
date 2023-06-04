import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlertType } from 'types/alert';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn({ type: 'int', name: 'notification_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  // the name of the device that generated the notification
  @Column({ nullable: false, name: 'generated_by' })
  generatedBy: string;

  @Column({ type: 'enum', enum: AlertType, name: 'type' })
  type: AlertType;

  @Column({ nullable: false, name: 'alert_id' })
  alertId: number;

  @Column({ nullable: true, name: 'image_path' })
  imagePath: string;

  @Column({ nullable: false })
  text: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
