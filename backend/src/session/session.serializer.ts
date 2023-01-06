import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

export class SessionSerializer extends PassportSerializer {
  // Inject UserService here
  constructor(
    @Inject('UserService') private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findOneById(user.id);
    return done(null, userDb);
  }
}
