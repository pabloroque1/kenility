import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/public';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  async createUser(@Body() createUser: CreateUserDTO) {
    return this.usersService.create(createUser);
  }

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDTO>) {
    return this.usersService.update(id, updateUserDto);
  }
}
