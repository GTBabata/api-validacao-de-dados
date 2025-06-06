import { Permission } from './user.request.dto';

export class CreateUserResponseDto {
  id: string;
  name: string;
  email: string;
  permission: Permission;
  age: number;
}
export class GetUserResponseDto extends CreateUserResponseDto {}
export class UpdateUserResponseDto {
  id?: string;
  name?: string;
  email?: string;
  permission?: Permission;
  age?: number;
}
