import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  private readonly logger: Logger = new Logger(DeviceService.name);
  constructor(
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
  ) {}
  create(createDeviceDto: CreateDeviceDto) {
    this.logger.log('Creating device');
    return this.deviceRepository.save(createDeviceDto);
  }

  findAll() {
    this.logger.log('Finding all devices');
    return this.deviceRepository.find();
  }

  findOneByUuid(uuid: string) {
    this.logger.log(`Finding device with id ${uuid}`);
    return this.deviceRepository.findOne({ where: { uuid } });
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto) {
    this.logger.log(`Updating device with id ${id}`);
    return this.deviceRepository.update(id, updateDeviceDto);
  }

  remove(id: string) {
    this.logger.log(`Removing device with id ${id}`);
  }
}
