import { Controller, Get } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get()
  getInformation() {
    return this.alertService.getMe();
  }

  @Get('send')
  send() {
    return this.alertService.sendAlert('5725062195', 'hi');
  }
}
