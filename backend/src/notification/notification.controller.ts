import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
@ApiTags('notification')
@UseGuards(AuthenticationGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':id/:takeLimit?')
  async getNotificationByUserId(
    @Param('id', ParseIntPipe) userId: number,
    @Param('takeLimit', new DefaultValuePipe(20), ParseIntPipe)
    takeLimit: number,
  ) {
    return await this.notificationService.getNotificationByUserId(
      userId,
      takeLimit,
    );
  }
}
