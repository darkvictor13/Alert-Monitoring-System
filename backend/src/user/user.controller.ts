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
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './user.serialized';
import { ISerializedUser } from '../../../types/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return plainToInstance(
      SerializedUser,
      this.userService.create(createUserDto),
    );
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  findAll() {
    return plainToInstance(SerializedUser, this.userService.findAll());
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(SerializedUser, this.userService.findOneById(id));
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard)
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
