import { BaseModel } from './base.model';
import { AddonModel } from './addon.model';
import { Model } from 'objection';

export class BrandModel extends BaseModel {
  static tableName = 'brands';

  name: string;
  categories: string[];
  addons: AddonModel[];

  static relationMappings = {
    addons: {
      modelClass: `${__dirname}/addon.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'brands.id',
        to: 'addons.brandId',
      },
    },
  };
}
