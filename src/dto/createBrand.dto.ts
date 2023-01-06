import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  categories: string[];
}
