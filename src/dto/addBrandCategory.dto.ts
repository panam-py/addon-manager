import { IsArray, ArrayMinSize } from 'class-validator';

export class AddBrandCategoryDto {
  @IsArray()
  @ArrayMinSize(1)
  categories: string[];
}
