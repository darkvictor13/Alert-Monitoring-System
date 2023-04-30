import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './create-notificaion.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async getNotificationByUserId(userId: number): Promise<Notification[]> {
    try {
      const rawNotifications = await this.notificationRepository
        .createQueryBuilder('notification')
        .orderBy('notification.created_at', 'DESC')
        .select('*')
        .where('notification.userId = :userId', { userId })
        .getRawMany();

      const notifications = rawNotifications.map((rawNotification) => {
        const notification = new Notification();
        notification.id = rawNotification.notification_id;
        notification.text = rawNotification.text;
        notification.generatedBy = rawNotification.generated_by;
        notification.createdAt = rawNotification.created_at;
        return notification;
      });

      return notifications;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Invalid user id');
    }
  }

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<number> {
    let user: User;
    if (typeof createNotificationDto.user === 'number') {
      user = await this.userService.findOneById(
        createNotificationDto.user,
        false,
        false,
      );
    } else {
      user = createNotificationDto.user;
    }
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      user,
    });
    return (await this.notificationRepository.save(notification)).id;
  }
}
