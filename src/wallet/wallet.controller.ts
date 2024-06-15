import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';
//import { DealException } from 'src/exceptions/deal.exception';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  findAll(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wallet> {
    return this.walletService.findOne(Number(id));
  }

  @Post()
  create(): Promise<Wallet> {
    return this.walletService.create(2);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.walletService.remove(Number(id));
  }
}
