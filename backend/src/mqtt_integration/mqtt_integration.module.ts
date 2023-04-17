import { Module } from '@nestjs/common';
import { MqttIntegrationController } from './mqtt_integration.controller';
import { MqttIntegrationService } from './mqtt_integration.service';

@Module({
  controllers: [MqttIntegrationController],
  providers: [MqttIntegrationService],
})
export class MqttIntegrationModule {}
