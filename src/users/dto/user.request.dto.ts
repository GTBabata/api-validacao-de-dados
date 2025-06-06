import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export enum Permission {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
  USER = 'user',
}

export class CreateUserRequestDto {
  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;
  @IsEmail({}, { message: 'Formato do email inválido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  @MinLength(5, { message: 'A senha deve ter no mínimo 5 caracteres' })
  password: string;
  @IsEnum(Permission, {
    message: 'As permissões permitidas são: admin, superadmin ou user',
  })
  permission: Permission;
  @IsNumber({}, { message: 'O campo age tem que ser um número' })
  @IsNotEmpty({ message: 'O campo age é obrigatório' })
  age: number;
}
export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}
