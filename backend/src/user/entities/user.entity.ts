import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['firstName', 'lastName'])
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ nullable: false, name: 'last_name' })
  lastName: string;
}
