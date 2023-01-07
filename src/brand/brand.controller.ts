import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsRole } from 'src/auth/is-role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { BrandService } from './brand.service';
import { BrandModel } from 'src/database/models/brand.model';
import { CreateBrandDto } from 'src/dto/createBrand.dto';
import { AddBrandCategoryDto } from 'src/dto/addBrandCategory.dto';
import { CreateAddonDto } from 'src/dto/createAddon.dto';
import { AddonModel } from 'src/database/models/addon.model';
import { AddonService } from 'src/addon/addon.service';
import { UpdateAddonDto } from 'src/dto/updateAddon.dto';

@IsRole('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
