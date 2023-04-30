import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
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
