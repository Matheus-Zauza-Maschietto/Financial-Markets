import {Body, ConflictException, Controller, Delete, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {Public} from "../auth/auth.guard";
import {CreateUserDto} from "./dto/create-user.dto";
import {fromCreateUsertoUser} from "./converter/create-user-dto-entity.converter";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async create(@Body() user: CreateUserDto): Promise<string> {
    try {
      const userCreate: User = await this.userService.create(fromCreateUsertoUser(user));
      if(!userCreate){
        throw new Error();
      }
      return "Usuário Criado com Sucesso";
    } catch (e){
      if(e instanceof ConflictException){
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Algo de errado aconteceu ao criar seu usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    try{
      return this.userService.remove(id);
    } catch (e){
      throw new HttpException('Erro ao excluir o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
