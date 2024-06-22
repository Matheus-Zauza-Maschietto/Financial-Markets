import {Controller, Get, HttpException, HttpStatus, Param, Query} from '@nestjs/common';
import {StockSymbolService} from "./stock-symbol.service";
import {StockSymbolDTO} from "./dto/stock-symbol-res.dto";
import {toStockSymbolDTO} from "./converter/stock-symbol.converter";

@Controller('stock-symbol')
export class StockSymbolController {
  constructor(private readonly stockSymbolService: StockSymbolService) {}

  @Get()
  async findAll(@Query('limit') limit?: number): Promise<StockSymbolDTO[]> {
    try {
      const stockSymbols = await this.stockSymbolService.findAll(limit);
      return stockSymbols.map(stockSymbol => toStockSymbolDTO(stockSymbol))
    } catch (e) {
      throw new HttpException('Erro ao consultar as ações disponíveis.', HttpStatus
          .INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<StockSymbolDTO> {
    try {
      return this.stockSymbolService.findById(id);
    } catch (e) {
      throw new HttpException('Erro ao consultar as ações disponíveis.', HttpStatus
          .INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/symbol/:symbol')
  async findSymbol(@Param('symbol') symbol: string): Promise<StockSymbolDTO> {
    try{
      return this.stockSymbolService.findBySymbol(symbol);
    } catch (e) {
      throw new HttpException('Erro ao consultar as ações disponíveis.', HttpStatus
          .INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/api/populete')
  async populateDatabase(): Promise<string> {
    try{
      await this.stockSymbolService.saveFromApiToDataBase();
      return 'POPULOU O BANCO COM A API!!!!'
    } catch (e) {
      throw new HttpException('Erro ao consultar as ações disponíveis.', HttpStatus
          .INTERNAL_SERVER_ERROR);
    }
  }
}