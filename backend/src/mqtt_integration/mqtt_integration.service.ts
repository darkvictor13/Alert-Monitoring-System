import { Inject, Injectable } from '@nestjs/common';
import { MqttService, Payload, Subscribe } from 'nest-mqtt';

@Injectable()
export class MqttIntegrationService {
  constructor(@Inject(MqttService) private readonly mqttService: MqttService) {}

  @Subscribe('test')
  test(@Payload() payload: any) {
    console.log(payload);
  }

  async testPublish() {
    this.mqttService.publish('topic', {
      foo: 'bar',
    });
  }
}
