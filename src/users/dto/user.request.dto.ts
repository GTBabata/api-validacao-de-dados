import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export enum Permission {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
  USER = 'user',
}

export class CreateUserRequestDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
  @IsString({ message: 'O campo name deve ser uma string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  @IsEmail({}, { message: 'Formato do email inválido' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuário (mínimo 5 caracteres)',
  })
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  @MinLength(5, { message: 'A senha deve ter no mínimo 5 caracteres' })
  password: string;

  @ApiProperty({
    example: Permission.USER,
    enum: Permission,
    description: 'Permissão do usuário',
  })
  @IsEnum(Permission, {
    message: 'As permissões aceitas são: admin, superadmin ou user',
  })
  permission: Permission;

  @ApiProperty({
    example: 25,
    description: 'Idade do usuário (entre 10 e 120)',
  })
  @IsNumber({}, { message: 'O campo age tem que ser um número' })
  @IsNotEmpty({ message: 'O campo age é obrigatório' })
  @IsNumber({}, { message: 'O campo age tem que ser um número' })
  @IsNotEmpty({ message: 'O campo age é obrigatório' })
  @Min(10, { message: 'A idade mínima permitida é 10' })
  @Max(120, { message: 'A idade máxima permitida é 120' })
  age: number;
}
export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome do usuário',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'Email do usuário',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuário',
    required: false,
  })
  password?: string;

  @ApiProperty({
    example: 'user',
    description: 'Permissão do usuário',
    required: false,
  })
  permission?: Permission;

  @ApiProperty({
    example: 25,
    description: 'Idade do usuário',
    required: false,
  })
  age?: number;
}
