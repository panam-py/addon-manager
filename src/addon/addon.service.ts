import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AddonModel } from 'src/database/models/addon.model';

@Injectable()
export class AddonService {
  constructor(
    @Inject('AddonModel') private modelClass: ModelClass<AddonModel>,
  ) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  create(props: Partial<AddonModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<AddonModel>) {
    return this.modelClass.query().patchAndFetchById(id, props);
  }

  delete(id: number) {
    return this.modelClass.query().delete().where({ id }).first();
  }
}
