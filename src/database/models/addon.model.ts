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
}
