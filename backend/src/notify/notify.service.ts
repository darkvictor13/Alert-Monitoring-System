import { Injectable } from '@nestjs/common';
import {
  TelegramMessage,
  TelegramService,
  TelegramUser,
} from 'nestjs-telegram';

// to send a message to my bot
// https://t.me/backend_alert_bot?start=start
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
    try {
      return this.telegram
        .sendMessage({ chat_id: sendToChatId, text: message })
        .toPromise();
    } catch (e) {
      /*
      throw new Error(
        `Error when sending the message ${message} to user ${sendToChatId} ` +
          e,
      );
      */
      console.log(
        `Error when sending the message ${message} to user ${sendToChatId} ` +
          e,
      );
    }
  }
}
