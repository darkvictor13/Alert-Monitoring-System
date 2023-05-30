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
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './entities/alert.entity';

@Controller('alert')
@ApiTags('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  @ApiOperation({ summary: 'Create an alert' })
  @UsePipes(ValidationPipe)
  create(@Body() createAlertDto: CreateAlertDto): Promise<number> {
    return this.alertService.create(createAlertDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all alerts' })
  @UseGuards(AuthenticationGuard)
  findAll(): Promise<Alert[]> {
    return this.alertService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an alert by id' })
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id') id: string): Promise<Alert> {
    return this.alertService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an alert by id' })
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticationGuard)
  update(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ): Promise<void> {
    return this.alertService.update(+id, updateAlertDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an alert by id' })
  @UseGuards(AuthenticationGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.alertService.remove(+id);
  }
}
