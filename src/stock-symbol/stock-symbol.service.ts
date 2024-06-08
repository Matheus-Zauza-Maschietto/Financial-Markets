import {Injectable} from '@nestjs/common';
import {StockSymbol} from "./entities/stock-symbol.entity";

@Injectable()
export class StockSymbolService {
  create(createStockSymbol: StockSymbol) {
    return 'This action adds a new stockSymbol';
  }

  findAll() {
    return `This action returns all stockSymbol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockSymbol`;
  }

  update(id: number, updateStockSymbol: StockSymbol) {
    return `This action updates a #${id} stockSymbol`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockSymbol`;
  }
}
