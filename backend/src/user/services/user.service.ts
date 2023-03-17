import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // check if user already exists
    const { email, firstName, lastName, telegramId, phoneNumber } =
      createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: [
        { email },
        { telegramId },
        { phoneNumber },
        { firstName, lastName },
      ],
    });
    // if user exists, throw an error
    if (existingUser) {
      if (existingUser.email === email) {
        throw new BadRequestException('An user with this email already exists');
      } else if (existingUser.telegramId === telegramId) {
        throw new BadRequestException(
          'An user with this telegramId already exists',
        );
      } else if (existingUser.phoneNumber === phoneNumber) {
        throw new BadRequestException(
          'An user with this phoneNumber already exists',
        );
      }
      throw new BadRequestException('An user with this name already exists');
    }

    const password = this.passwordService.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
    });
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userRepository.delete(id);
  }
}
