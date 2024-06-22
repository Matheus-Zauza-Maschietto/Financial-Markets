import {Inject, Injectable} from '@nestjs/common';
import { StockSymbol } from './entities/stock-symbol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinnhubService } from '../finnhub/finnhub.service';
import {QuoteService} from "../quote/quote.service";
import {StockSymbolDTO} from "./dto/stock-symbol-res.dto";
import {toStockSymbolDTO} from "./converter/stock-symbol.converter";

@Injectable()
export class StockSymbolService {
  constructor(
    @InjectRepository(StockSymbol)
    private stockRepository: Repository<StockSymbol>,
    private readonly finnhubService: FinnhubService,
    @Inject(QuoteService)
    private quoteService: QuoteService
    ,
  ) {}

  async findAll(limit: number): Promise<StockSymbol[]> {
    return !limit ? this.stockRepository.find() :
        this.stockRepository.find({take: limit});
  }

  async findById(id: number): Promise<StockSymbolDTO> {
    const stock: StockSymbolDTO = toStockSymbolDTO(await this.stockRepository.findOneBy({ id: id }));
    const quote = await this.quoteService.getQuotePerSymbol(stock.displaySymbol);
    stock.value = quote.c
    return stock;
  }

  async findBySymbol(symbol: string): Promise<StockSymbolDTO> {
    const stock: StockSymbolDTO = toStockSymbolDTO(await this.stockRepository.findOneBy({ displaySymbol: symbol }));
    const quote = await this.quoteService.getQuotePerSymbol(stock.displaySymbol);
    stock.value = quote.c
    return stock;
  }

  async saveFromApiToDataBase(): Promise<void> {
    const api: StockSymbol[] = await this.getValuesFromApi();

    // const chunkSize = api.length > 100 ? 50 : api.length / 2;
    // const apiChunked: [StockSymbol[]] = [[]];
    // for (let i = 0; i < api.length; i += chunkSize) {
    //   apiChunked.push(api.slice(i, i + chunkSize));
    // }
    // await Promise.all(apiChunked.map((c) => new Promise(() => this.stockRepository.save(c))));
    // apiChunked.forEach(c =>
    //   new Promise(() => this.stockRepository.save(c))
    // ); 40 segundos

    for (let i = 0; i < api.length; i += 200) {
      // console.log(`${i} - ${api.length - i > 200 ? 200 : api.length - i}`);
      new Promise(() => {
        this.stockRepository
            .createQueryBuilder()
            .insert()
            .into(StockSymbol)
            .values(api.slice(i, i + 200 > api.length ? api.length : i + 200))
            .execute();
      });
    } // 15 segs
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
