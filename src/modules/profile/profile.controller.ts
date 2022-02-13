import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { JWTGuard } from '../../utils/guards/jwt.guard';
import { GetUserId } from '../../utils/decorators/get-user-id';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profile')
@UseGuards(JWTGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Get own profile' })
  @Get('me')
  @ApiOkResponse({
    description: 'Your profile information.',
    type: () => Profile,
  })
  @ApiUnauthorizedResponse({
    description: 'You have to sign in first.',
  })
  async getOwnProfile(@GetUserId() userId: number): Promise<Profile> {
    return this.profileService.getProfileByUserId(userId);
  }
}
