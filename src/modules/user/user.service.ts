import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateProfileDto } from '../../types/dtos/create-profile';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepos: UserRepository,
    private readonly profileService: ProfileService,
  ) {}

  async create(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersRepos.save({ email, password });

    const profileDto = new CreateProfileDto(username, user.id);
    await this.profileService.create(profileDto);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepos.findOne({ email });
  }
}
