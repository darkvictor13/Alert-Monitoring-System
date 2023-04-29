import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':id')
  async getNotificationByUserId(@Param('id', ParseIntPipe) userId: number) {
    return await this.notificationService.getNotificationByUserId(userId);
  }
}
