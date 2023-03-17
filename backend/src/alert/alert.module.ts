import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramModule } from 'nestjs-telegram';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';

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
  controllers: [AlertController],
  providers: [AlertService, TelegramModule],
})
export class AlertModule {}
