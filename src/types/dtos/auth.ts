import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(4, {
    message: 'The password is too short (at least 4 chars expected)',
  })
  readonly password: string;
  constructor(
    readonly dto?: {
      password: string;
      email: string;
    },
  ) {
    if (dto) {
      this.password = dto.password;
      this.email = dto.email;
    }
  }
}
