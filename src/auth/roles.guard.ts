import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<Role>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) return true;

    const { user } = context.switchToHttp().getRequest();

    const decision = requiredRole === user.role;

    if (!decision)
      throw new HttpException(
        'Please log in as admin to continue',
        HttpStatus.UNAUTHORIZED,
      );
    return decision;
  }
}
