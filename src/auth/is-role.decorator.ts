import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/types';
export const IsRole = (role: Role) => SetMetadata('role', role);
