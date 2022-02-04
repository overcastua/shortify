import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from '../../types/dtos/auth';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: AuthDto): Promise<User> {
    const user = new User({ ...dto });

    return this.save(user);
  }
}
