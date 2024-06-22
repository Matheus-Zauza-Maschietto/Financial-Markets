import { Module } from '@nestjs/common';
import { StockSymbolService } from './stock-symbol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockSymbol } from './entities/stock-symbol.entity';
import { FinnhubService } from '../finnhub/finnhub.service';
import { StockSymbolController } from './stock-symbol.controller';
 
@Module ({
  imports: [TypeOrmModule.forFeature([StockSymbol])],
  providers: [StockSymbolService, FinnhubService],
  controllers: [StockSymbolController]
})
export class StockSymbolModule {}
