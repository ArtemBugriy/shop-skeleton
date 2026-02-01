import { ProductCreateInput } from '@prisma-generated/prisma/models/Product';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto implements ProductCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string | null;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  stock?: number;
}
