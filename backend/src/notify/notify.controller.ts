import { Controller, Get } from '@nestjs/common';
import { NotifyService } from './notify.service';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get()
  getInformation() {
    return this.notifyService.getMe();
  }

  @Get('send')
  send() {
    return this.notifyService.sendTelegramNotification('5725062195', 'hi');
  }
}
