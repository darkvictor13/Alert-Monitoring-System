import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NotifyService } from 'src/notify/notify.service';
import { Alert } from '../entities/alert.entity';
import { ALERT_QUEUE_NAME } from '../constants';
import { UserService } from 'src/user/services/user.service';
import { AlertDataPresenceWithPhoto, AlertType } from 'types/alert';
import { User } from 'src/user/entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/create-notificaion.dto';
import { FileService } from 'src/file/file.service';

type AlertProcessorFunction = (alert: Alert) => Promise<boolean>;

@Processor(ALERT_QUEUE_NAME)
export class AlertProcessor {
  private readonly logger: Logger = new Logger(AlertProcessor.name);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly notifyService: NotifyService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  private AlertToFileName(alert: Alert): string {
    return `photos/${alert.id}.jpg`;
  }

  private alertTypeToText(type: AlertType): string {
    switch (type) {
      case AlertType.PRESENCE_ALERT:
        return 'detectou presença';
      case AlertType.PRESENCE_ALERT_WITH_PHOTO:
        return 'detectou presença';
      default:
        return 'alerta';
    }
  }

  async extractUserFromAlert(alert: Alert): Promise<User | null> {
    if (!alert.device.user) {
      this.logger.error(`User not found for alert: ${alert.id}`);
      return null;
    }
    if (typeof alert.device.user === 'number') {
      return await this.userService.findOneById(alert.device.user);
    }
    return alert.device.user;
  }

  async processPresenceAlertWithPhoto(alert: Alert): Promise<boolean> {
    this.logger.log('Processing presence alert with photo');
    const user = await this.extractUserFromAlert(alert);
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
    await this.notificationService.createNotification(createNotificationDto);
    this.logger.log('Notification created');

    /*
    const alertData: AlertDataPresenceWithPhoto = JSON.parse(alert.data);
    this.logger.log('data parsed');
    const photo = Buffer.from(alertData.buffer, 'base64').toString('ascii');
    this.logger.log('photo parsed');
    const ret = await this.notifyService.sendTelegramPicture(
      user.telegramId,
      photo,
      `Dispositivo ${alert.device.name} informa: ${text}`,
    );
    this.logger.log(`Photo sent: ${ret}`);
    */

    const filename = this.AlertToFileName(alert);
    const alertData: AlertDataPresenceWithPhoto = JSON.parse(alert.data);
    this.logger.log('data parsed');
    const photo = Buffer.from(alertData.buffer, 'base64');
    const ret = this.fileService.writeFileSync(filename, photo);
    this.logger.log(`Photo saved: ${ret}`);

    return true;
  }

  async processPresenceAlert(alert: Alert): Promise<boolean> {
    this.logger.log('Processing presence alert');
    const user = await this.extractUserFromAlert(alert);
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
      case AlertType.PRESENCE_ALERT_WITH_PHOTO:
        this.logger.log('Processing presence alert with photo');
        toRun = this.processPresenceAlertWithPhoto.bind(this);
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
