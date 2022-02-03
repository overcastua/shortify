import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthDto } from '../../types/dtos/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepos: UserRepository,
  ) {}

  async register(dto: AuthDto): Promise<User> {
    if (await this.findByEmail(dto.email)) {
      throw new ConflictException('The email address is already in use');
    }

    const salt = 10;

    const hash: string = await bcrypt.hash(dto.password, salt);

    const dtoWithHashedPassword = new AuthDto({
      ...dto,
      password: hash,
    });

    return this.usersRepos.register(dtoWithHashedPassword);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepos.findOne({ email });
  }
}
