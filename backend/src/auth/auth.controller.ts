import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  async login(): Promise<void> {
    return;
  }
}
