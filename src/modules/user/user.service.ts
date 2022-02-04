import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthDto } from '../../types/dtos/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepos: UserRepository,
  ) {}

  async create(dto: AuthDto): Promise<User> {
    return this.usersRepos.createUser(dto);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepos.findOne({ email });
  }
}
