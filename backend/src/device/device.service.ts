import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  private readonly logger: Logger = new Logger(DeviceService.name);
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
  ) {}
  async create(createDeviceDto: CreateDeviceDto): Promise<string> {
    this.logger.log('Creating device');
    const user = await this.userService.findOneById(createDeviceDto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const device = this.deviceRepository.create({
      ...createDeviceDto,
      user,
    });
    return (await this.deviceRepository.save(device)).uuid;
  }

  findAll(): Promise<Device[]> {
    this.logger.log('Finding all devices');
    return this.deviceRepository.find({
      loadRelationIds: { relations: ['user'] },
    });
  }

  findOneByUuid(uuid: string): Promise<Device> {
    this.logger.log(`Finding device with id ${uuid}`);
    return this.deviceRepository.findOne({
      where: { uuid },
      loadRelationIds: true,
    });
  }

  // get the user who owns the device
  //async getUserByDeviceId(deviceId: string) {
  //const device = await this.findOneByUuid(deviceId);

  async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<void> {
    this.logger.log(`Updating device with id ${id}`);
    const device = this.findOneByUuid(id);
    if (!device) {
      throw new Error('Device not found');
    }
    await this.deviceRepository.update(id, updateDeviceDto);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing device with id ${id}`);
    const device = this.findOneByUuid(id);
    if (!device) {
      throw new Error('Device not found');
    }
    await this.deviceRepository.delete(id);
  }
}
