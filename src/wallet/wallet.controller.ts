import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {Wallet} from "./entities/wallet.entity";

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  findAll(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wallet> {
    return this.walletService.findOne(+id);
  }

  @Post()
  create(@Body() wallet: Wallet): Promise<Wallet> {
    return this.walletService.create(wallet);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.walletService.remove(+id);
  }
}