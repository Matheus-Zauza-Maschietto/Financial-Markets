import {Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CalledStock} from "./entities/called-stock.entity";
import {Wallet} from "../wallet/entities/wallet.entity";
import {StockSymbol} from "../stock-symbol/entities/stock-symbol.entity";
import {QuoteService} from "../quote/quote.service";

@Injectable()
export class CalledStockService {
  constructor(
      @InjectRepository(CalledStock)
      private calledStockRepository: Repository<CalledStock>,
      @InjectRepository(Wallet)
      private walletRepository: Repository<Wallet>,
      @InjectRepository(StockSymbol)
      private stockRepository: Repository<StockSymbol>,
      @Inject(QuoteService)
      private quoteService: QuoteService
  ) {}

  findAll(): Promise<CalledStock[]> {
    return this.calledStockRepository.find();
  }

  findOne(id: number): Promise<CalledStock> {
    return this.calledStockRepository.findOneBy({ id });
  }

  async create(calledStock: CalledStock, walletId: number, symbol: string): Promise<CalledStock> {
    calledStock.wallet = await this.walletRepository.findOneBy({id: walletId});
    calledStock.stockSymbol = await this.stockRepository.findOneBy({displaySymbol: symbol});
    calledStock.buyPrice = this.quoteService.getQuotePerSymbol(symbol).c;

    return this.calledStockRepository.save(calledStock);
  }

  async remove(id: number): Promise<void> {
    await this.calledStockRepository.delete(id);
  }
}