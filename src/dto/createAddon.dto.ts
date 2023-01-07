import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddonDto {
  @IsNotEmpty()
  name: string;

  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  category?: string;
}
