import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsRole } from '../auth/is-role.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { BrandService } from './brand.service';
import { BrandModel } from '../database/models/brand.model';
import { CreateBrandDto } from '../dto/createBrand.dto';
import { AddBrandCategoryDto } from '../dto/addBrandCategory.dto';
import { CreateAddonDto } from '../dto/createAddon.dto';
import { AddonModel } from '../database/models/addon.model';
import { AddonService } from '../addon/addon.service';
import { UpdateAddonDto } from '../dto/updateAddon.dto';
import { CustomAuthGuard } from '../auth/custom-auth.guard';

@IsRole('admin')
@UseGuards(new CustomAuthGuard('jwt'), RolesGuard)
@Controller('brands')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly addonService: AddonService,
  ) {}
  @Get('')
  async getAllBrands(): Promise<BrandModel[]> {
    return this.brandService.findAll();
  }

  @Get('/:id')
  async getOneBrand(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<BrandModel> {
    const brand = await this.brandService.findOne(id);
    if (!brand)
      throw new HttpException(
        'No brand found with that id',
        HttpStatus.NOT_FOUND,
      );
    return brand;
  }

  @Post('')
  async createBrand(@Body() data: CreateBrandDto): Promise<BrandModel> {
    return this.brandService.create(data);
  }

  @Post('/:id/addons')
  async createAddon(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: CreateAddonDto,
  ): Promise<AddonModel> {
    const addon = await this.addonService.create(id, data);
    if (!addon)
      throw new HttpException(
        'No brand found with this id',
        HttpStatus.NOT_FOUND,
      );
    return addon;
  }

  @Get('/:id/addons')
  async getBrandAddons(@Param('id', new ParseIntPipe()) id: number) {
    return this.addonService.findAllBrandAddons(id);
  }

  @Get('/:brandId/addons/:addonId')
  async getBrandAddon(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ) {
    const addon = await this.addonService.findOneBrandAddon(brandId, addonId);
    if (!addon)
      throw new HttpException(
        'No addon found with this id for this brand',
        HttpStatus.NOT_FOUND,
      );
    return addon;
  }

  @Patch('/:brandId/addons/:addonId')
  async updateBrandAddon(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
    @Body() data: UpdateAddonDto,
  ) {
    const addon = await this.addonService.updateBrandAddon(
      brandId,
      addonId,
      data,
    );
    if (!addon)
      throw new HttpException(
        'No addon found with this id for this brand',
        HttpStatus.NOT_FOUND,
      );
    return addon;
  }

  @Delete('/:brandId/addons/:addonId')
  @HttpCode(204)
  async deleteAddon(@Param('addonId', new ParseIntPipe()) addonId: number) {
    await this.addonService.delete(addonId);
  }

  @Post('/:id/addon-categories')
  async addCategory(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: AddBrandCategoryDto,
  ): Promise<BrandModel> {
    const brand = await this.brandService.addCategory(id, data.name);
    if (!brand)
      throw new HttpException(
        'No brand found with that id',
        HttpStatus.NOT_FOUND,
      );
    return brand;
  }
}
