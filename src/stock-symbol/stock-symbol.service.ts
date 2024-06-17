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

  getValuesFromApi(): StockSymbol[]{
    //TODO: Fazer ele salvar, mesmo B.O q em QUOTE está voltando o valor na DATA e não consigo dar o return nele, mas sim na request
    // que seria a this.finnhubService.getConnection().stockSymbols()
    return this.finnhubService.getConnection().stockSymbols("US", (error, data, response) => {
      console.log(data)
    });
  }

  saveFromApiToDataBase(){
    const api: StockSymbol[] = this.getValuesFromApi();
    return this.stockRepository.save(api);
  }
}
