import { IsNumber } from 'class-validator';

export class UpdateAddonDto {
  name: string;

  description?: string;

  @IsNumber()
  price: number;

  category?: string;
}
