import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
// import { UserModel } from 'src/database/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);
    user.password = undefined;
    return user;
  }
}
