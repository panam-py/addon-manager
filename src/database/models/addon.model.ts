import { BaseModel } from './base.model';

export class AddonModel extends BaseModel {
  static tableName = 'addons';

  brandId: number;

  name: string;
  description: string;
  price: number;
  category: string;
}
