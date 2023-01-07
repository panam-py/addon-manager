import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BrandService } from 'src/brand/brand.service';
import { AddonModel } from 'src/database/models/addon.model';

@Injectable()
export class AddonService {
  constructor(
    @Inject('AddonModel') private modelClass: ModelClass<AddonModel>,
    private readonly brandService: BrandService,
  ) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  async create(brandId: number, props: Partial<AddonModel>) {
    const brand = await this.brandService.findOne(brandId);
    if (!brand) return null;
    if (props.category && !brand.categories.includes(props.category))
      throw new HttpException(
        `Brand ${brand.name} has no category called ${props.category}`,
        HttpStatus.FORBIDDEN,
      );
    props.brandId = brandId;
    return this.modelClass.query().insert(props).returning('*');
  }

  findAllBrandAddons(brandId: number) {
    return this.modelClass.query().where({ brandId });
  }

  findOneBrandAddon(brandId: number, addonId: number) {
    return this.modelClass
      .query()
      .where({ brandId })
      .where({ id: addonId })
      .first();
  }

  update(id: number, props: Partial<AddonModel>) {
    return this.modelClass.query().patchAndFetchById(id, props);
  }

  async updateBrandAddon(
    brandId: number,
    addonId: number,
    props: Partial<AddonModel>,
  ) {
    const brand = await this.brandService.findOne(brandId);
    if (!brand) return null;
    if (props.category && !brand.categories.includes(props.category))
      throw new HttpException(
        `Brand ${brand.name} has no category called ${props.category}`,
        HttpStatus.FORBIDDEN,
      );
    const addon = await this.modelClass
      .query()
      .patchAndFetchById(addonId, props);
    if (!addon) return null;
    return addon;
  }

  delete(id: number) {
    return this.modelClass.query().delete().where({ id }).first();
  }
}
