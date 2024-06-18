import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {StockSymbolService} from "./stock-symbol.service";
import {StockSymbol} from "./entities/stock-symbol.entity";

@Controller('stock-symbol')
export class StockSymbolController {
  constructor(private readonly stockSymbolService: StockSymbolService) {}

  @Get()
  findAll(): Promise<StockSymbol[]> {
    return this.stockSymbolService.findAll();
  }

  @Get('/symbol/:id')
  findOne(@Param('id') id: string): Promise<StockSymbol> {
    return this.stockSymbolService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.stockSymbolService.remove(id);
  }

  @Get("/populate")
  async populateDatabase(): Promise<String> {
    await this.stockSymbolService.saveFromApiToDataBase();
    return 'DEU BOMMMMMM!!!!'
  }
}