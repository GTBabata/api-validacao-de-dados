import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequestDto,
  Permission,
  UpdateUserRequestDto,
} from './dto/user.request.dto';
import { Response } from 'express';
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: CreateUserRequestDto })
  @ApiResponse({ status: 200, description: 'Usuário criado com sucesso.' })
  create(@Body() createUserDto: CreateUserRequestDto, @Res() res: Response) {
    const user = this.usersService.create(createUserDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Usuario criado com sucesso', data: user });
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários ou filtra por permissão' })
  @ApiQuery({ name: 'permission', required: false, enum: Permission })
  @ApiResponse({
    status: 200,
    description: 'Usuários recuperados com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Esse tipo de permissão não existe',
  })
  findAll(@Query('permission') permission: Permission, @Res() res: Response) {
    if (permission) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Esse tipo de permissão não existe' });
    }

    const usersList = this.usersService.findAll(permission);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Usuários recuperados com sucesso.', data: usersList });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Usuário recuperado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string, @Res() res: Response) {
    const user = this.usersService.findOne(id);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Usuário não encontrado' });
    }

    return res
      .status(HttpStatus.OK)
      .json({ message: `Usuário #${id} recuperado com sucesso.`, data: user });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário existente' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateUserRequestDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
    @Res() res: Response,
  ) {
    const updatedUser = this.usersService.update(id, updateUserDto);

    if (!updatedUser) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `Usuário #${id} não encontrado.` });
    }

    return res.status(HttpStatus.OK).json({
      message: `Usuário #${id} atualizado com sucesso.`,
      data: updatedUser,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário pelo ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso.' })
  remove(@Param('id') id: string, @Res() res: Response) {
    this.usersService.remove(id);
    return res
      .status(HttpStatus.NO_CONTENT)
      .json({ message: `Usuário #${id} removido com sucesso.` });
  }
}
