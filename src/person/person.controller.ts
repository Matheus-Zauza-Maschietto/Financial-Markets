import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import {Person} from "./entities/person.entity";

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Person> {
    return this.personService.findOne(+id);
  }

  @Post()
  create(@Body() person: Person): Promise<Person> {
    return this.personService.create(person);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.personService.remove(+id);
  }
}