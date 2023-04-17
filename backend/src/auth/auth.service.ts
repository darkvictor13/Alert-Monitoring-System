import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/user/services/password.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = this.passwordService.comparePassword(
      password,
      user.password,
    );
    return isPasswordValid ? user : null;
  }
}
