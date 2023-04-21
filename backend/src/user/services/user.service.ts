import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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

  async create(createUserDto: CreateUserDto): Promise<number> {
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
    return (await this.userRepository.save(newUser)).id;
  }

  findAll(): Promise<User[]> {
    this.logger.log('Getting all users');
    return this.userRepository.find();
  }

  findOneById(id: number, loadDevices = false): Promise<User> {
    this.logger.log(`Getting user with id ${id}`);
    const options: FindOneOptions<User> = { where: { id } };
    if (loadDevices) {
      options.relations = ['devices'];
    }
    return this.userRepository.findOne(options);
  }

  findOneByEmail(email: string): Promise<User> {
    this.logger.log(`Getting user with email ${email}`);
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    this.logger.log(`Updating user with id ${id}`);
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Deleting user with id ${id}`);
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.delete(id);
  }
}
