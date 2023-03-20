import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(): Promise<void> {
    return;
  }
}
