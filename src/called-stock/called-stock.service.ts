import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Between, Repository} from 'typeorm';
import { CalledStock } from './entities/called-stock.entity';
import { Wallet } from '../wallet/entities/wallet.entity';
import { StockSymbol } from '../stock-symbol/entities/stock-symbol.entity';
import { QuoteService } from '../quote/quote.service';

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
    private quoteService: QuoteService,
  ) {}

  findAll(): Promise<CalledStock[]> {
    return this.calledStockRepository.findBy({ deleted: false });
  }

  findBetweenDates(startDate: Date, endDate: Date): Promise<CalledStock[]> {
    return this.calledStockRepository.findBy({ calledDate: Between(new Date(startDate), new Date(endDate)), deleted: false });
  }

  async create(
    calledStock: CalledStock,
    walletId: number,
    symbol: string,
  ): Promise<CalledStock> {
    const wallet: Wallet = await this.walletRepository.findOneBy({
      id: walletId,
    });
    calledStock.wallet = wallet;
    calledStock.stockSymbol = await this.stockRepository.findOneBy({
      displaySymbol: symbol,
    });
    calledStock.buyPrice = (
      await this.quoteService.getQuotePerSymbol(symbol)
    ).c;
    calledStock.calledDate = new Date();
    const calledStockSave: Promise<CalledStock> =
      this.calledStockRepository.save(calledStock);

    wallet.value -= calledStock.quantity * calledStock.buyPrice;
    this.walletRepository.save(wallet);

    return calledStockSave;
  }

  async sellById(id: number): Promise<void> {
    const calledStock: CalledStock = await this.calledStockRepository.findOneBy(
      { id: id },
    );
    this.sellCalledStock(calledStock);
  }

  private async sellCalledStock(calledStock: CalledStock){
    const sellPrice: number = (
        await this.quoteService.getQuotePerSymbol(calledStock.stockSymbol?.symbol)
    ).c;
    const wallet: Wallet = calledStock.wallet;
    wallet.value += sellPrice * calledStock.quantity;

    this.walletRepository.save(calledStock.wallet);

    calledStock.sellPrice = sellPrice;
    calledStock.deleted = true;

    await this.calledStockRepository.save(calledStock);
  }
}