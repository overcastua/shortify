export class CreateProfileDto {
  readonly username: string;

  readonly userId: number;

  constructor(username: string, userId: number) {
    if (username && userId) {
      this.username = username;
      this.userId = userId;
    }
  }
}
