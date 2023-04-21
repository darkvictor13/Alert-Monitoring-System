import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './entities/alert.entity';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createAlertDto: CreateAlertDto): Promise<number> {
    return this.alertService.create(createAlertDto);
  }

  @Get()
  findAll(): Promise<Alert[]> {
    return this.alertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Alert> {
    return this.alertService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ): Promise<void> {
    return this.alertService.update(+id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.alertService.remove(+id);
  }
}
