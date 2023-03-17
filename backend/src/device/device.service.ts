import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
  ) {}
  create(createDeviceDto: CreateDeviceDto) {}

  findAll() {
    return this.deviceRepository.find();
  }

  findOne(id: number) {
    return this.deviceRepository.findOne({ where: { id } });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {}

  remove(id: number) {}
}
