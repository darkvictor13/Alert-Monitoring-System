import { Controller, Post } from '@nestjs/common';
import { MqttIntegrationService } from './mqtt_integration.service';

@Controller('mqtt-integration')
export class MqttIntegrationController {
  constructor(
    private readonly mqttIntegrationService: MqttIntegrationService,
  ) {}
}
