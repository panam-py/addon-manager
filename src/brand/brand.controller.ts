import {
  Body,
  Controller,
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

@IsRole('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
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

  @Patch('/:id/add-category')
  async addCategory(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: AddBrandCategoryDto,
  ): Promise<BrandModel> {
    const brand = await this.brandService.addCategory(id, data.categories);
    if (!brand)
      throw new HttpException(
        'No brand found with that id',
        HttpStatus.NOT_FOUND,
      );
    return brand;
  }
}
