import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
@ApiTags('notification')
@UseGuards(AuthenticationGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get notifications by user id' })
  async getNotificationByUserId(
    @Query('notificationId', new DefaultValuePipe(0), ParseIntPipe)
    notificationId: number,
    @Query('userId', new DefaultValuePipe(0), ParseIntPipe) userId: number,
    @Query('takeLimit', new DefaultValuePipe(20), ParseIntPipe)
    takeLimit: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ) {
    if (notificationId !== 0) {
      return [
        await this.notificationService.getNotificationById(notificationId),
      ];
    }
    if (userId === 0) {
      return new BadRequestException(
        'Either notificationId or userId is required',
      );
    }
    return await this.notificationService.getNotificationByUserId(
      userId,
      takeLimit,
      skip,
    );
  }
}
