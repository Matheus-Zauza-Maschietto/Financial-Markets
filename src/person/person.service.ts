import {Inject, Injectable} from '@nestjs/common';
import {UpdatePersonDto} from './dto/update-person.dto';
import {Repository} from 'typeorm';
import {Person} from './entities/person.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {WalletService} from "../wallet/wallet.service";

@Injectable()
export class PersonService {
  private readonly personRepository: Repository<Person>;
  constructor(@InjectRepository(Person) personRepository: Repository<Person>,
              @Inject(WalletService) private walletService: WalletService) {
    this.personRepository = personRepository;
  }

  public async create(createPersonDto: Person): Promise<Person> {
    const person: Person = await this.personRepository.save(createPersonDto);
    await this.walletService.create(person.id);
    return person;
  }

  public async findAll(): Promise<Person[]> {

    return await this.personRepository.find({
      relations: {
        wallet: true
      }});
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

  public async findAllReletionById(id: number): Promise<Person>{
    return await this.personRepository.findOne({
      where: {
        id: id
      },
      relations: {
        wallet: {
          calledStocks: {
            stockSymbol: true
          },
        }
      },
    });
  }
}
