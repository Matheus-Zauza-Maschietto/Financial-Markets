import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {CalledStock} from "./entities/called-stock.entity";
import {CalledStockService} from "./called-stock.service";
import {CreateCalledStockDto} from "./dto/create-called-stock.dto";
import {toCalledStock} from "./converter/create-called-stock.converter";
import {ViewCalledStockDto} from "./dto/view-called-stock.dto";
import {toViewCalledStockDto} from "./converter/view-called-stock.converter";

@Controller('calledstocks')
export class CalledStockController {
  constructor(private readonly calledStockService: CalledStockService) {}

  @Get()
  async findAll(): Promise<ViewCalledStockDto[]> {
    return (await this.calledStockService.findAll()).map(c => toViewCalledStockDto(c));
  }

  @Get('/between/date')
  async findBetweenDates(@Query("startDate") startDate: Date, @Query("endDate") endDate: Date): Promise<ViewCalledStockDto[]> {
    return (await this.calledStockService.findBetweenDates(startDate, endDate)).map(c => toViewCalledStockDto(c));
  }

  @Post(':displaySymbol')
  async create(@Param('displaySymbol') symbol: string,
               @Body() calledStock: CreateCalledStockDto): Promise<ViewCalledStockDto> {
    const walletId: number = 1;
    return toViewCalledStockDto(await this.calledStockService.create(toCalledStock(calledStock), walletId, symbol));
  }

  @Delete(':id')
  sellById(@Param('id') id: number): Promise<void> {
    return this.calledStockService.sellById(id);
  }
}