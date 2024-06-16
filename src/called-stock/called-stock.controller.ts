import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {CalledStock} from "./entities/called-stock.entity";
import {CalledStockService} from "./called-stock.service";

@Controller('calledstocks')
export class CalledStockController {
  constructor(private readonly calledStockService: CalledStockService) {}

  @Get()
  findAll(): Promise<CalledStock[]> {
    return this.calledStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CalledStock> {
    return this.calledStockService.findOne(+id);
  }

  @Post(':displaySymbol')
  async create(@Param('displaySymbol') symbol: string,
               @Body() calledStock: CalledStock): Promise<CalledStock> {
    const walletId: number = 1;
    return await this.calledStockService.create(calledStock, walletId, symbol);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.calledStockService.remove(+id);
  }
}