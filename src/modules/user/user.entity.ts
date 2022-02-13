import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Link } from '../link/link.entity';

@Entity('user', { schema: 'auth' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Link, (lnk) => lnk.user)
  links: Link[];
}
