import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';

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

  @Post(':id')
  create(@Param('id') id: number): Promise<Wallet> {
    return this.walletService.create(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.walletService.remove(Number(id));
  }
}
