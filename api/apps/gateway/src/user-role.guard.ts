// user-role.guard.ts
import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './user-roles.enum';

export const ROLES_KEY = 'roles';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());

    if (!requiredRoles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.role;

    return userRole && requiredRoles.includes(userRole);
  }
}
