import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthDto } from '../../types/dtos/auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('signup')
  async create(@Body() dto: AuthDto): Promise<void> {
    await this.userService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async login(
    @Body() dto: AuthDto,
    @Req() req,
  ): Promise<{ access_token: string }> {
    return this.authService.login(dto.email);
  }
}
