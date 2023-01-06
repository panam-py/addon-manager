import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from '../database/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  async create(props: Partial<UserModel>) {
    const existingUser = await this.modelClass
      .query()
      .where({ username: props.username })
      .first();

    if (existingUser)
      throw new HttpException(
        'User already exists with this username',
        HttpStatus.CONFLICT,
      );
    props.password = await bcrypt.hash(props.password, 10);
    return await this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<UserModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  delete(id: number) {
    this.modelClass.query().delete().where({ id }).returning('*').first();
  }
}
