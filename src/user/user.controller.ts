import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
// import { UserModel } from 'src/database/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    users.map((user) => (user.password = undefined));
    return users;
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const user = await this.userService.findOne(id);
    if (!user)
      throw new HttpException(
        'No user found with that id',
        HttpStatus.NOT_FOUND,
      );

    user.password = undefined;
    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);
    user.password = undefined;
    return user;
  }
}
