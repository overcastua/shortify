import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user', { schema: 'auth' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  constructor(dto: any) {
    if (dto) {
      this.email = dto.email;
      this.password = dto.password;
    }
  }
}
