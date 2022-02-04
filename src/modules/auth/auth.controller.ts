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
  async signup(@Body() dto: AuthDto): Promise<void> {
    return this.authService.signup(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(
    @Body() dto: AuthDto,
    @Req() req,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(req.user);
  }
}
