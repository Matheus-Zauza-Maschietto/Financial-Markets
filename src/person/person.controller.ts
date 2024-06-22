import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
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
    return (await this.personService.findAll()).map(p => toViewPersonDto(p));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ViewPersonDto> {
    return toViewPersonDto(await this.personService.findAllReletionById(id));
  }

  @Post()
  async create(@Body() personDto: CreatePersonDto): Promise<ViewPersonDto> {
    const newPerson: Person = {
      bornDate: personDto.bornDate,
      cpf: personDto.cpf,
      name: personDto.name,
      wallet: null,
      user: null,
      id: null,
    };
    return toViewPersonDto(await this.personService.create(newPerson));
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.personService.remove(Number(id));
  }
}
