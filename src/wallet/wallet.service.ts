import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { Person } from 'src/person/entities/person.entity';
import { DealException } from 'src/exceptions/deal.exception';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async findWalletIdByUserId(userId: number): Promise<number> {
    return (await this.walletRepository.findOneBy({person: {user: {id: userId}}})).id;
  }

  async findOne(id: number): Promise<Wallet> {
    return this.walletRepository.findOneBy({ id });
  }

  async create(personId: number): Promise<Wallet> {
    const person: Person | null = await this.personRepository.findOneBy({
      id: personId,
    });

    if (!person) {
      throw new DealException(
        'Não é permitido a criação de uma carteira sem o preenchimento das informações pessoais',
      );
    }
    const newWallet: Wallet = new Wallet(null, 0, person);

    return this.walletRepository.save(newWallet);
  }

  async remove(id: number): Promise<void> {
    await this.walletRepository.delete(id);
  }
}
