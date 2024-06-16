import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
  private readonly personRepository: Repository<Person>;
  constructor(@InjectRepository(Person) personRepository: Repository<Person>) {
    this.personRepository = personRepository;
  }

  public async create(createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personRepository.save(createPersonDto);
  }

  public async findAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  public async findOne(id: number): Promise<Person> {
    return await this.personRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  public async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    return await this.personRepository.save({
      id: id,
      bornDate: updatePersonDto.bornDate,
      cpf: updatePersonDto.cpf,
      name: updatePersonDto.name,
    });
  }

  public async remove(id: number) {
    await this.personRepository.delete({ id: id });
  }
}
