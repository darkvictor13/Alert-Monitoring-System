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
    const user = await this.userService.findOneById(userId, false, true);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user.notifications;
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
