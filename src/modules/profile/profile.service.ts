import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.entity';
import { CreateProfileDto } from '../../types/dtos/create-profile';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    return this.profileRepository.save({ ...dto });
  }

  async getProfileByUserId(userId: number): Promise<Profile> {
    return this.profileRepository.findOne({ userId });
  }
}
