import {Module} from '@nestjs/common';
import {StockSymbolService} from './stock-symbol.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {StockSymbol} from "./entities/stock-symbol.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StockSymbol])],
  providers: [StockSymbolService],
})
export class StockSymbolModule {}
