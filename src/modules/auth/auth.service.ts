import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthDto } from '../../types/dtos/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async signin(user: {
    email: string;
    id: number;
  }): Promise<{ accessToken: string }> {
    const payload = {
      id: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(dto: AuthDto): Promise<void> {
    if (await this.usersService.findByEmail(dto.email)) {
      throw new ConflictException('The email address is already in use');
    }

    const salt = 10;

    const hash: string = await bcrypt.hash(dto.password, salt);

    const dtoWithHashedPassword = new AuthDto({
      ...dto,
      password: hash,
    });

    await this.usersService.create(dtoWithHashedPassword);
  }
}
