import { Test, TestingModule } from '@nestjs/testing';
import { MqttIntegrationService } from './mqtt_integration.service';

describe('MqttIntegrationService', () => {
  let service: MqttIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttIntegrationService],
    }).compile();

    service = module.get<MqttIntegrationService>(MqttIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
