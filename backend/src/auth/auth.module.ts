import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/services/user.service';
import { PasswordService } from 'src/user/services/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from 'src/session/session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthService,
    },
    {
      provide: 'UserService',
      useClass: UserService,
    },
    PasswordService,
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
