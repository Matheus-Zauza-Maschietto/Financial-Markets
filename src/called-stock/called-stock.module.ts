import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CalledStock} from './entities/called-stock.entity';
import {CalledStockService} from './called-stock.service';
import {CalledStockController} from './called-stock.controller';
import {QuoteService} from '../quote/quote.service';
import {Wallet} from '../wallet/entities/wallet.entity';
import {StockSymbol} from '../stock-symbol/entities/stock-symbol.entity';
import {FinnhubService} from '../finnhub/finnhub.service';
import {Quote} from '../quote/entities/quote.entity';
import {WalletService} from "../wallet/wallet.service";
import {Person} from "../person/entities/person.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CalledStock, Wallet, StockSymbol, Quote, Person])],
  providers: [CalledStockService, QuoteService, FinnhubService, WalletService],
  controllers: [CalledStockController],
})
export class CalledStockModule {}
