import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BrandModel } from 'src/database/models/brand.model';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BrandModel') private modelClass: ModelClass<BrandModel>,
  ) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  create(props: Partial<BrandModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<BrandModel>) {
    return this.modelClass.query().patchAndFetchById(id, props);
  }

  delete(id: number) {
    return this.modelClass.query().delete().where({ id }).first();
  }

  //   addCategory(id: number, newCategory: string) {
  //     const brand = this.findOne(id);
  //     brand.
  //     return this.modelClass.query().patch({categories: })
  //   }
}
