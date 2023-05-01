import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ALERT_QUEUE_NAME } from '../constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: ALERT_QUEUE_NAME,
    }),
  ],
  exports: [BullModule],
})
export class AlertQueueModule {}
