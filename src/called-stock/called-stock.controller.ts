import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CalledStock} from "./entities/called-stock.entity";
import {CalledStockService} from "./called-stock.service";
import {CreateCalledStockDto} from "./dto/create-called-stock.dto";
import {toCalledStock} from "./converter/create-called-stock.converter";

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
               @Body() calledStock: CreateCalledStockDto): Promise<CalledStock> {
    const walletId: number = 1;
    return await this.calledStockService.create(toCalledStock(calledStock), walletId, symbol);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.calledStockService.remove(id);
  }
}