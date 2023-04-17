import { Test, TestingModule } from '@nestjs/testing';
import { MqttIntegrationController } from './mqtt_integration.controller';

describe('MqttIntegrationController', () => {
  let controller: MqttIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqttIntegrationController],
    }).compile();

    controller = module.get<MqttIntegrationController>(
      MqttIntegrationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
