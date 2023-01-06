import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from './services/password.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { SessionSerializer } from 'src/session/session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, PasswordService, SessionSerializer], //private
  exports: [UserService, PasswordService], //public
})
export class UserModule {}
