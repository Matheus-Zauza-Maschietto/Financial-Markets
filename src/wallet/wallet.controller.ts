import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';
//import { DealException } from 'src/exceptions/deal.exception';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Get()
  findAll(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wallet> {
    return this.walletService.findOne(Number(id));
  }

  @Post()
  create(@Body() wallet: Wallet): Promise<Wallet> {
    //try {
    return this.walletService.create(wallet);
    // } catch (e) {
    //   if (e instanceof DealException) {
    //     return e.message;
    //   } else {
    //     return 'Houve um erro';
    //   }
    // }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.walletService.remove(Number(id));
  }
}
