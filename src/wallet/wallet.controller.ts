import {Controller, Get, Param} from '@nestjs/common';
import {WalletService} from './wallet.service';
import {Wallet} from './entities/wallet.entity';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  findAll(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Wallet> {
    return this.walletService.findOne(id);
  }
}
