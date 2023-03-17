import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DeviceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const deviceToken = request.headers.device_token;

    if (!deviceToken) {
      return false;
    }

    const jwtSecret = process.env.JWT_SECRET;
    try {
      const payload = jwt.verify(deviceToken, jwtSecret, {
        algorithms: ['HS256'],
      });
      return Boolean(payload);
    } catch (e) {
      console.log(e);
      throw new ForbiddenException('Invalid device token');
    }
  }
}
