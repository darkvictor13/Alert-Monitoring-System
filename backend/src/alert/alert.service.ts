import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceService } from 'src/device/device.service';
import { Repository } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './entities/alert.entity';

@Injectable()
export class AlertService {
  private readonly logger: Logger = new Logger(AlertService.name);
  constructor(
    @InjectRepository(Alert) private alertRepository: Repository<Alert>,
    private readonly deviceService: DeviceService,
  ) {}

  async create(createAlertDto: CreateAlertDto): Promise<number> {
    this.logger.log('Creating alert');
    const device = await this.deviceService.findOneByUuid(
      createAlertDto.deviceUuid,
    );
    if (!device) {
      throw new BadRequestException('Device not found');
    }
    const alert = this.alertRepository.create({
      ...createAlertDto,
      device,
    });
    return (await this.alertRepository.save(alert)).id;
  }

  findAll(): Promise<Alert[]> {
    this.logger.log('Finding all alerts');
    return this.alertRepository.find();
  }

  findOne(id: number): Promise<Alert> {
    this.logger.log(`Finding alert with id ${id}`);
    return this.alertRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAlertDto: UpdateAlertDto): Promise<void> {
    this.logger.log(`Updating alert with id ${id}`);
    const alert = await this.findOne(id);
    if (!alert) {
      throw new BadRequestException('Alert not found');
    }
    await this.alertRepository.update(id, updateAlertDto);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing alert with id ${id}`);
    const alert = await this.findOne(id);
    if (!alert) {
      throw new BadRequestException('Alert not found');
    }
    await this.alertRepository.delete(id);
  }
}
