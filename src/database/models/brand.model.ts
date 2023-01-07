import { BaseModel } from './base.model';

export class BrandModel extends BaseModel {
  static tableName = 'brands';

  name: string;
  categories: string[];
}
