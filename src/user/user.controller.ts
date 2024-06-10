import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './entities/user.entities';
import { createUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  private readonly userService: UsersService;
  constructor(userService: UsersService) {
    this.userService = userService;
  }

  @Post()
  public async create(@Body() user: createUserDto): Promise<User> {
    const createUser = await this.userService.createUser(user);
    return createUser;
  }
}
