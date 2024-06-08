import { Module } from '@nestjs/common';
import { StockSymbolService } from './stock-symbol.service';

@Module({
  providers: [StockSymbolService],
})
export class StockSymbolModule {}
