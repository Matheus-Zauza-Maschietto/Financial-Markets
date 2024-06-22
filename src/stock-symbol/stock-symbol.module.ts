import { Module } from '@nestjs/common';
import { StockSymbolService } from './stock-symbol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockSymbol } from './entities/stock-symbol.entity';
import { FinnhubService } from '../finnhub/finnhub.service';
import { StockSymbolController } from './stock-symbol.controller';
import {QuoteService} from "../quote/quote.service";
import {Quote} from "../quote/entities/quote.entity";
 
@Module ({
  imports: [TypeOrmModule.forFeature([StockSymbol, Quote])],
  providers: [StockSymbolService, FinnhubService, QuoteService],
  controllers: [StockSymbolController]
})
export class StockSymbolModule {}
