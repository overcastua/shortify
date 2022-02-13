import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('link')
export class Link {
  @PrimaryColumn({ name: 'origin_url' })
  originUrl: string;

  @Column({ name: 'tokenized_url' })
  tokenizedUrl: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (usr) => usr.links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
