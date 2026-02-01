import { UserCreateInput } from '@prisma-generated/prisma/models/User';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto implements UserCreateInput {
  @IsEmail()
  email?: string | null;

  @IsPhoneNumber()
  phone?: string | null;

  @IsString()
  @IsNotEmpty()
  password: string;
}
