import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { DeviceModule } from 'src/device/device.module';
import { AlertProcessor } from './queue/alert.processor';
import { NotifyModule } from 'src/notify/notify.module';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';
import { AlertQueueModule } from './queue/alert-queue.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    DeviceModule,
    NotifyModule,
    UserModule,
    NotificationModule,
    TypeOrmModule.forFeature([Alert]),
    AlertQueueModule,
    FileModule,
  ],
  controllers: [AlertController],
  providers: [AlertService, AlertProcessor],
  exports: [AlertService],
})
export class AlertModule {}
