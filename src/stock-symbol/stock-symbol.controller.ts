import { Controller, Get, Param, Query } from '@nestjs/common';
import { StockSymbolService } from './stock-symbol.service';
import { StockSymbolDTO } from './dto/stock-symbol-res.dto';
import { toStockSymbolDTO } from './converter/stock-symbol.converter';

@Controller('stock-symbol')
export class StockSymbolController {
  constructor(private readonly stockSymbolService: StockSymbolService) {}

  @Get()
  async findAll(@Query('limit') limit?: number): Promise<StockSymbolDTO[]> {
    const stockSymbols = await this.stockSymbolService.findAll(limit);
    return stockSymbols.map((stockSymbol) => toStockSymbolDTO(stockSymbol))
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<StockSymbolDTO> {
    const stockSymbol = this.stockSymbolService.findById(id);
    return toStockSymbolDTO(await stockSymbol);
  }

  @Get('/symbol/:symbol')
  async findSymbol(@Param('symbol') symbol: string): Promise<StockSymbolDTO> {
    const stockSymbol = this.stockSymbolService.findBySymbol(symbol);
    return toStockSymbolDTO(await stockSymbol);
  }

  @Get('/api/populete')
  async populateDatabase(): Promise<string> {
    await this.stockSymbolService.saveFromApiToDataBase();
    return 'POPULOU O BANCO COM A API!!!!';
  }
}
