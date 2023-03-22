import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating user');
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

  findAll(): Promise<User[]> {
    this.logger.log('Getting all users');
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User> {
    this.logger.log(`Getting user with id ${id}`);
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string): Promise<User> {
    this.logger.log(`Getting user with email ${email}`);
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    this.logger.log(`Updating user with id ${id}`);
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return (await this.userRepository.update(id, updateUserDto)).affected === 1;
  }

  async remove(id: number): Promise<boolean> {
    this.logger.log(`Deleting user with id ${id}`);
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return (await this.userRepository.delete(id)).affected === 1;
  }
}
