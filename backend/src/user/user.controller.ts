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
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './user.serialized';

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
  findAll(@Query('email') email: string) {
    if (email) {
      return plainToInstance(
        SerializedUser,
        this.userService.findOneByEmail(email),
      );
    }
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
  @HttpCode(204)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
