import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['firstName', 'lastName'])
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ nullable: false, name: 'last_name' })
  lastName: string;

  @Column({ nullable: true, name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column({ nullable: true, name: 'telegram_id', unique: true })
  telegramId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_updated_at' })
  lastUpdatedAt: Date;
}
