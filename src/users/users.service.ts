import { Injectable } from '@nestjs/common';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from './dto/user.request.dto';
import {
  CreateUserResponseDto,
  GetUserResponseDto,
  UpdateUserResponseDto,
} from './dto/user.response.dto';

import users from './db/users.db.json';
const usersList = users as GetUserResponseDto[];

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserRequestDto): CreateUserResponseDto {
    const newUser: CreateUserResponseDto = {
      id: '1',
      name: createUserDto.name,
      email: createUserDto.email,
      permission: createUserDto.permission,
      age: createUserDto.age,
    };
    return newUser;
  }

  findAll(param: string) {
    if (param == '' || param == undefined) {
      return usersList;
    }

    const filteredUsers = usersList.filter(
      (user) => user.permission.toString() == param,
    );
    return filteredUsers;
  }

  findOne(id: string) {
    const user = usersList.find((user) => user.id == id);
    return user;
  }

  update(_id: string, updateUserDto: UpdateUserRequestDto) {
    const updatedUser: UpdateUserResponseDto = {
      id: '',
      name: updateUserDto.name,
      email: updateUserDto.email,
      permission: updateUserDto.permission,
      age: updateUserDto.age,
    };
    return updatedUser;
  }

  remove(id: string) {
    const deletedUser = usersList.find((user) => user.id == id);
    return deletedUser;
  }
}
