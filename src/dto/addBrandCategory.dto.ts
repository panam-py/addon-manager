import { IsNotEmpty } from 'class-validator';

export class AddBrandCategoryDto {
  @IsNotEmpty()
  name: string;
}
