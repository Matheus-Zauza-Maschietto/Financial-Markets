import { Injectable } from '@nestjs/common';
import { StockSymbol } from './entities/stock-symbol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinnhubService } from '../finnhub/finnhub.service';

@Injectable()
export class StockSymbolService {
  constructor(
    @InjectRepository(StockSymbol)
    private stockRepository: Repository<StockSymbol>,
    private readonly finnhubService: FinnhubService,
  ) {}

  async findAll(limit: number): Promise<StockSymbol[]> {
    return !limit ? this.stockRepository.find() :
        this.stockRepository.find({take: limit});
  }

  async findById(id: number): Promise<StockSymbol> {
    return this.stockRepository.findOneBy({ id: id });
  }

  async findBySymbol(symbol: string): Promise<StockSymbol> {
    return this.stockRepository.findOneBy({ displaySymbol: symbol });
  }

  async saveFromApiToDataBase(): Promise<void> {
    const api: StockSymbol[] = await this.getValuesFromApi();
    const chunkSize = api.length > 100 ? 50 : api.length / 2;
    const apiChunked: [StockSymbol[]] = [[]];
    for (let i = 0; i < api.length; i += chunkSize) {
      apiChunked.push(api.slice(i, i + chunkSize));
    }
    apiChunked.forEach(c =>
      new Promise(() => this.stockRepository.save(c))
    );
  }

  private getValuesFromApi(): Promise<StockSymbol[]>{
    return new Promise((resolve, reject) => {
      this.finnhubService
          .getConnection()
          .stockSymbols('US', { limit: 0 }, (error, data, response) => {
        if(error){
          reject(error);
        }
        resolve(data);
      });
    });
  }
}
