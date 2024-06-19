import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Person> {
    return await this.personService.findAllReletionById(id);
  }

  @Post()
  create(@Body() personDto: CreatePersonDto): Promise<Person> {
    const newPerson: Person = {
      bornDate: personDto.bornDate,
      cpf: personDto.cpf,
      name: personDto.name,
      wallet: null,
      user: null,
      id: null,
    };
    return this.personService.create(newPerson);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.personService.remove(Number(id));
  }
}
