import {Injectable} from '@nestjs/common';
import {StockSymbol} from "./entities/stock-symbol.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class StockSymbolService {

  constructor(@InjectRepository(StockSymbol)private stockRepository: Repository<StockSymbol>,
  ) {}

  async findAll(): Promise<StockSymbol[]> {
    return this.stockRepository.find();
  }

  async findOne(id: number): Promise<StockSymbol> {
    return this.stockRepository.findOneBy({id: id});
  }

  async create(stock: StockSymbol): Promise<StockSymbol> {
    return this.stockRepository.save(stock);
  }

  async update(id: number, stock: Partial<StockSymbol>): Promise<StockSymbol> {
    await this.stockRepository.update(id, stock);
    return this.stockRepository.findOneBy({id: id});
  }

  async remove(id: number): Promise<void> {
    await this.stockRepository.delete(id);
  }
}
