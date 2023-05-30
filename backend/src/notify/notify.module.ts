import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramModule } from 'nestjs-telegram';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        botKey: configService.get('TELEGRAM_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [NotifyService, TelegramModule],
  exports: [NotifyService],
})
export class NotifyModule {}
