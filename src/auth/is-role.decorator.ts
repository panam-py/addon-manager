import { SetMetadata } from '@nestjs/common';
import { Role } from '../types';
export const IsRole = (role: Role) => SetMetadata('role', role);
