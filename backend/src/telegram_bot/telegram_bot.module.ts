import { Module } from '@nestjs/common';
import { TelegramBotUpdate } from './telegram_bot.update';

@Module({
  providers: [TelegramBotUpdate],
})
export class TelegramBotModule {}
