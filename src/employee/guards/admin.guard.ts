import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

const ADMIN_TOKEN = 'secure-admin-token-560013';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies['admin_token'];

    if (token === ADMIN_TOKEN) {
      return true;
    }

    throw new UnauthorizedException('Chỉ admin mới được truy cập');
  }
}
