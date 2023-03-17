import { Injectable } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';

// to send a message to my bot
// https://telegram.me/backend_alert_bot?sendmessage=Hello+World
@Injectable()
export class AlertService {
  constructor(private readonly telegram: TelegramService) {}

  getMe() {
    return this.telegram.getMe().toPromise();
  }

  sendAlert() {
    return this.telegram
      .sendMessage({
        chat_id: '5725062195',
        text: 'Hello World',
      })
      .toPromise();
  }
}
