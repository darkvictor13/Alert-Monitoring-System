import { Inject, Injectable } from '@nestjs/common';
import { MqttService, Payload, Subscribe } from 'nest-mqtt';

@Injectable()
export class MqttIntegrationService {
  constructor(@Inject(MqttService) private readonly mqttService: MqttService) {}

  @Subscribe({
    topic: 'topic',
    transform: 'text',
  })
  test(@Payload() payload: string) {
    console.log(payload);
  }

  async testPublish() {
    this.mqttService.publish('topic', {
      foo: 'bar',
    });
  }
}
