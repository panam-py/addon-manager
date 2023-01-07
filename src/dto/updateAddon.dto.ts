import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAddonDto {
  name: string;

  description?: string;

  @IsNumber()
  @IsOptional()
  price: number;

  category?: string;
}
