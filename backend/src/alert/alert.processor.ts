import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NotifyService } from 'src/notify/notify.service';
import { Alert } from './entities/alert.entity';
import { ALERT_QUEUE_NAME } from './constants';
import { UserService } from 'src/user/services/user.service';
import { AlertType } from 'types/alert';
import { User } from 'src/user/entities/user.entity';

type AlertProcessorFunction = (alert: Alert) => Promise<boolean>;

@Processor(ALERT_QUEUE_NAME)
export class AlertProcessor {
  private readonly logger: Logger = new Logger(AlertProcessor.name);

  constructor(
    private readonly notifyService: NotifyService,
    private readonly userService: UserService,
  ) {}

  async processTextAlert(alert: Alert): Promise<boolean> {
    this.logger.log('Processing text alert');
    if (!alert.device.user) {
      this.logger.error(`User not found for alert: ${alert.id}`);
      return false;
    }

    let user: User;
    if (typeof alert.device.user === 'number') {
      this.logger.log('in if');
      user = await this.userService.findOneById(alert.device.user);
    } else {
      this.logger.log('in else');
      user = alert.device.user;
    }
    if (!user) {
      this.logger.error(`User not found for alert: ${alert.id}`);
      return false;
    }

    this.logger.log(`Sending text alert to user: ${user.id}`);
    /*
    await this.notifyService.sendTelegramNotification(
      user.telegramId,
      `Alert: ${JSON.stringify(alert.data)} for device ${alert.device.name}`,
    );
    */
    return true;
  }

  @Process()
  async processAlert(job: Job<Alert>) {
    this.logger.log(`Processing alert: ${job.id}`);

    let toRun: AlertProcessorFunction;
    switch (job.data.type) {
      case AlertType.TEXT_ALERT:
        this.logger.log('Processing text alert');
        toRun = this.processTextAlert.bind(this);
        break;
      default:
        this.logger.error(`Unknown alert type: ${job.data.type}`);
        return;
    }
    const success = await toRun(job.data);
    if (!success) {
      this.logger.error(`Failed to process alert: ${job.id}`);
    }
  }
}
