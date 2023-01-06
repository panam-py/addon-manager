import { BaseModel } from './base.model';
import { Role } from 'src/types';

export class UserModel extends BaseModel {
  static tableName = 'users';

  username: string;
  password: string;
  role: Role;
}
