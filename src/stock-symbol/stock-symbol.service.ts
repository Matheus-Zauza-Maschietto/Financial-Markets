import {Injectable} from '@nestjs/common';
import {StockSymbol} from "./entities/stock-symbol.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FinnhubService} from "../finnhub/finnhub.service";

@Injectable()
export class StockSymbolService {

  constructor(@InjectRepository(StockSymbol)private stockRepository: Repository<StockSymbol>,
              private readonly finnhubService: FinnhubService,
  ) {}

  async findAll(): Promise<StockSymbol[]> {
    return this.stockRepository.find();
  }

  async findOne(id: number): Promise<StockSymbol> {
    return this.stockRepository.findOneBy({id: id});
  }

  async save(stock: StockSymbol): Promise<StockSymbol> {
    return this.stockRepository.save(stock);
  }

  async update(id: number, stock: Partial<StockSymbol>): Promise<StockSymbol> {
    await this.stockRepository.update(id, stock);
    return this.stockRepository.findOneBy({id: id});
  }

  async remove(id: number): Promise<void> {
    await this.stockRepository.delete(id);
  }

  async saveFromApiToDataBase() {
    const api: StockSymbol[] = await this.getValuesFromApi();
    const chunkSize = api.length > 100 ? 50 : api.length / 2;
    let apiChunked: [StockSymbol[]] = [[]];
    for (let i = 0; i < api.length; i += chunkSize) {
      apiChunked.push(api.slice(i, i + chunkSize));
    }
    apiChunked.forEach(c =>
      new Promise(() => this.stockRepository.save(c))
    );
  }

  private getValuesFromApi(): Promise<StockSymbol[]>{
    return new Promise((resolve, reject) => {
      this.finnhubService.getConnection().stockSymbols("US", { limit: 0 }, (error, data, response) => {
        console.log(data)
        resolve(data);
      });
    });
  }
}
