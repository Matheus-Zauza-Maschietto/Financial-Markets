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

  @Post()
  create(@Body() calledStock: CalledStock): Promise<CalledStock> {
    return this.calledStockService.create(calledStock);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.calledStockService.remove(+id);
  }
}