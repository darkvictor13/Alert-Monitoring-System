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
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { DeviceGuard } from 'src/auth/guards/device.guard';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { IDevice } from 'types/device';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('device')
@ApiTags('device')
@UseGuards(AuthenticationGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a device' })
  @UsePipes(ValidationPipe)
  create(@Body() createDeviceDto: CreateDeviceDto): Promise<string> {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all devices' })
  findAll(): Promise<IDevice[]> {
    return this.deviceService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a device by uuid' })
  findOneByUuid(@Param('uuid') uuid: string): Promise<IDevice> {
    return this.deviceService.findOneByUuid(uuid);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all devices by user id' })
  findOneByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<IDevice[]> {
    return this.deviceService.findAllByUserId(userId);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a device by uuid' })
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  update(
    @Param('uuid') uuid: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<void> {
    return this.deviceService.update(uuid, updateDeviceDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete a device by uuid' })
  @HttpCode(204)
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.deviceService.remove(uuid);
  }
}
