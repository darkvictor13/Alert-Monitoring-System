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
  ParseIntPipe,
  UseGuards,
  Query,
  HttpCode,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './user.serialized';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create user' })
  create(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(AuthenticationGuard)
  findAll(@Query('email') email: string): SerializedUser | SerializedUser[] {
    if (email) {
      return plainToInstance(
        SerializedUser,
        this.userService.findOneByEmail(email),
      );
    }
    return plainToInstance(SerializedUser, this.userService.findAll());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @UseGuards(AuthenticationGuard)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('loadDevices', new DefaultValuePipe(false), ParseBoolPipe)
    loadDevices: boolean,
    @Query('loadNotifications', new DefaultValuePipe(false), ParseBoolPipe)
    loadNotifications: boolean,
  ): SerializedUser {
    return plainToInstance(
      SerializedUser,
      this.userService.findOneById(id, loadDevices, loadNotifications),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @UseGuards(AuthenticationGuard)
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @UseGuards(AuthenticationGuard)
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
