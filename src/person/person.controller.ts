import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {PersonService} from './person.service';
import {Person} from './entities/person.entity';
import {CreatePersonDto} from './dto/create-person.dto';
import {ViewPersonDto} from "./dto/view-person.dto";
import {toViewPersonDto} from "./converter/view-called-stock.converter";

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async findAll(): Promise<ViewPersonDto[]> {
    try{
      return (await this.personService.findAll()).map(p => toViewPersonDto(p));
    } catch (e) {
      throw new HttpException('Erro ao procurar todas as pessoas.', HttpStatus
          .INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ViewPersonDto> {
    try{
      return toViewPersonDto(await this.personService.findAllReletionById(id));
    } catch (e) {
      throw new HttpException('Erro ao procurar uma pessoa.', HttpStatus
          .INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() personDto: CreatePersonDto): Promise<ViewPersonDto> {
    try {
      const newPerson: Person = {
        bornDate: personDto.bornDate,
        cpf: personDto.cpf,
        name: personDto.name,
        wallet: null,
        user: null,
        id: null,
      };
      return toViewPersonDto(await this.personService.create(newPerson));
    } catch (e) {
      throw new HttpException('Erro ao criar uma pessoa.', HttpStatus
          .INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    try{
      return this.personService.remove(Number(id));
    } catch (e) {
      throw new HttpException('Erro ao deletar uma pessoa.', HttpStatus
          .INTERNAL_SERVER_ERROR);
    }
  }
}
