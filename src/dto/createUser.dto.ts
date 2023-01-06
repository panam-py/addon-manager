import { IsNotEmpty, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsIn(['user', 'admin'])
  role: string;
}
