import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Wallet} from "./entities/wallet.entity";

@Injectable()
export class WalletService {
  constructor(
      @InjectRepository(Wallet)
      private walletRepository: Repository<Wallet>,
  ) {}

  findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  findOne(id: number): Promise<Wallet> {
    return this.walletRepository.findOneBy({ id });
  }

  create(wallet: Wallet): Promise<Wallet> {
    return this.walletRepository.save(wallet);
  }

  async remove(id: number): Promise<void> {
    await this.walletRepository.delete(id);
  }
}