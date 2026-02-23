import { CategoryCreateInput } from '@prisma-generated/prisma/models/Category';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto implements CategoryCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string | null;
}
