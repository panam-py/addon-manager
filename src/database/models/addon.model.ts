import { Model } from 'objection';
import { BaseModel } from './base.model';
import { BrandModel } from './brand.model';

export class AddonModel extends BaseModel {
  static tableName = 'addons';

  brandId: number;

  name: string;
  description: string;
  price: number;
  category: string;
  brand: BrandModel;

  static relationMappings = {
    brand: {
      modelClass: `${__dirname}/brand.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'addons.brandId',
        to: 'brands.id',
      },
    },
  };
}
