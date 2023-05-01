import { Module } from '@nestjs/common';
import { AlertModule } from 'src/alert/alert.module';
import { MqttIntegrationController } from './mqtt_integration.controller';
import { MqttIntegrationService } from './mqtt_integration.service';

@Module({
  imports: [AlertModule],
  controllers: [MqttIntegrationController],
  providers: [MqttIntegrationService],
})
export class MqttIntegrationModule {}
