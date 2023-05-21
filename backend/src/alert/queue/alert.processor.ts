import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NotifyService } from 'src/notify/notify.service';
import { Alert } from '../entities/alert.entity';
import { ALERT_QUEUE_NAME } from '../constants';
import { UserService } from 'src/user/services/user.service';
import { AlertType } from 'types/alert';
import { User } from 'src/user/entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/create-notificaion.dto';

type AlertProcessorFunction = (alert: Alert) => Promise<boolean>;

@Processor(ALERT_QUEUE_NAME)
export class AlertProcessor {
  private readonly logger: Logger = new Logger(AlertProcessor.name);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly notifyService: NotifyService,
    private readonly userService: UserService,
  ) {}

  private alertTypeToText(type: AlertType): string {
    switch (type) {
      case AlertType.PRESENCE_ALERT:
        return 'detectou presença';
      default:
        return 'alerta';
    }
  }

  async processPresenceAlert(alert: Alert): Promise<boolean> {
    this.logger.log('Processing presence alert');
    if (!alert.device.user) {
      this.logger.error(`User not found for alert: ${alert.id}`);
      return false;
    }

    let user: User;
    if (typeof alert.device.user === 'number') {
      user = await this.userService.findOneById(alert.device.user);
    } else {
      user = alert.device.user;
    }
    if (!user) {
      this.logger.error(`User not found for alert: ${alert.id}`);
      return false;
    }

    const text = this.alertTypeToText(alert.type);
    const createNotificationDto: CreateNotificationDto = {
      user,
      generatedBy: alert.device.name,
      text,
    };
    this.notificationService.createNotification(createNotificationDto);
    await this.notifyService.sendTelegramNotification(
      user.telegramId,
      `Dispositivo ${alert.device.name} informa: ${text}`,
    );
    return true;
  }

  @Process()
  async processAlert(job: Job<Alert>) {
    this.logger.log(`Processing alert: ${job.id}`);

    let toRun: AlertProcessorFunction;
    switch (job.data.type) {
      case AlertType.PRESENCE_ALERT:
        this.logger.log('Processing presence alert');
        toRun = this.processPresenceAlert.bind(this);
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
