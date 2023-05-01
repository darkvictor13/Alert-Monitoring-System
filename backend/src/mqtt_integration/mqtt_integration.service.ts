import { Inject, Injectable } from '@nestjs/common';
import { MqttService, Payload, Subscribe } from 'nest-mqtt';
import { AlertService } from 'src/alert/alert.service';
import { CreateAlertDto } from 'src/alert/dto/create-alert.dto';

@Injectable()
export class MqttIntegrationService {
  constructor(
    @Inject(AlertService) private readonly alertService: AlertService,
    @Inject(MqttService) private readonly mqttService: MqttService,
  ) {}

  @Subscribe({
    topic: 'alert',
    transform: 'text',
  })
  processAlert(@Payload() payload: string) {
    const createAlertDto: CreateAlertDto = JSON.parse(payload);
    this.alertService.create(createAlertDto);
  }

  async testPublish() {
    this.mqttService.publish('topic', {
      foo: 'bar',
    });
  }
}
