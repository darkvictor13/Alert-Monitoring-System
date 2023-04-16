import { Injectable } from '@nestjs/common';
import {
  TelegramMessage,
  TelegramService,
  TelegramUser,
} from 'nestjs-telegram';

// to send a message to my bot
// https://telegram.me/backend_alert_bot?sendmessage=Hello+World
@Injectable()
export class NotifyService {
  constructor(private readonly telegram: TelegramService) {}

  getMe(): Promise<TelegramUser> {
    return this.telegram.getMe().toPromise();
  }

  sendTelegramNotification(
    sendToChatId: string,
    message: string,
  ): Promise<TelegramMessage> {
    return this.telegram
      .sendMessage({ chat_id: sendToChatId, text: message })
      .toPromise();
  }
}
