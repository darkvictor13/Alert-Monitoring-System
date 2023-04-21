import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { DeviceModule } from 'src/device/device.module';
import { BullModule } from '@nestjs/bull';
import { ALERT_QUEUE_NAME } from './constants';
import { AlertProcessor } from './alert.processor';
import { NotifyModule } from 'src/notify/notify.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    DeviceModule,
    NotifyModule,
    UserModule,
    TypeOrmModule.forFeature([Alert]),
    BullModule.registerQueue({
      name: ALERT_QUEUE_NAME,
    }),
  ],
  controllers: [AlertController],
  providers: [AlertService, AlertProcessor],
})
export class AlertModule {}
