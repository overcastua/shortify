import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthDto } from '../../types/dtos/auth';
import { SignupDto } from '../../types/dtos/signup';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Sign up' })
  @Post('signup')
  @ApiCreatedResponse({
    description: 'You were registered. Returns jwt access token.',
  })
  @ApiConflictResponse({
    description: 'This email address is already in use.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data.',
  })
  async signup(@Body() dto: SignupDto): Promise<{ accessToken: string }> {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Sign in' })
  @Post('signin')
  @ApiCreatedResponse({
    description: 'You were singed in. Returns jwt access token.',
  })
  @ApiUnauthorizedResponse({
    description: 'User does not exist or the passwords do not match',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data.',
  })
  async signin(
    @Body() dto: AuthDto,
    @Req() req,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(dto);
  }
}
