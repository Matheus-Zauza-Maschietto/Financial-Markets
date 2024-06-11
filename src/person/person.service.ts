import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Person} from "./entities/person.entity";

@Injectable()
export class PersonService {
  constructor(
      @InjectRepository(Person)
      private personRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: number): Promise<Person> {
    return this.personRepository.findOneBy({ id });
  }

  create(person: Person): Promise<Person> {
    return this.personRepository.save(person);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }
}