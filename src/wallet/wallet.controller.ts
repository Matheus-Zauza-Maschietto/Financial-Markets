import {Controller, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
import {WalletService} from './wallet.service';
import {Wallet} from './entities/wallet.entity';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  findAll(): Promise<Wallet[]> {
    try{
      return this.walletService.findAll();
    } catch (e) {
      throw new HttpException('Erro ao consultar as carteiras de compra.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Wallet> {
    try{
      return this.walletService.findOne(id);
    } catch (e) {
      throw new HttpException('Erro ao consultar as carteiras de compra.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
