import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeviceGuard } from 'src/auth/guards/device.guard';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  @UseGuards(DeviceGuard)
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':uuid')
  findOneByUuid(@Param('uuid') uuid: string) {
    return this.deviceService.findOneByUuid(uuid);
  }

  @Patch(':uuid')
  @UsePipes(ValidationPipe)
  update(
    @Param('uuid') uuid: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.deviceService.update(uuid, updateDeviceDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.deviceService.remove(uuid);
  }
}
