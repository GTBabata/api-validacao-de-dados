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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserRequestDto, @Res() res: Response) {
    const user = this.usersService.create(createUserDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Usuario criado com sucesso', data: user });
  }

  @Get()
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
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
    @Res() res: Response,
  ) {
    const updatedUser = this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json({
      message: `Usuário #${id} atualizado com sucesso.`,
      data: updatedUser,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.usersService.remove(id);
    // Em operações de remoção, é comum retornar o status 204 (No Content)
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
