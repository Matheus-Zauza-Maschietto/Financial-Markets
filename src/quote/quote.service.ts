import { Injectable } from '@nestjs/common';
import { Quote } from './entities/quote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinnhubService } from '../finnhub/finnhub.service';

@Injectable()
export class QuoteService {
  constructor(
    private readonly finnhubService: FinnhubService,
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
  ) {}

  async create(createQuote: Quote) {
    this.quoteRepository.save(createQuote);
  }

  async findAll(): Promise<Quote[]> {
    return this.quoteRepository.find();
  }

  async getQuotePerSymbol(symbol: string): Promise<Quote> {
    return new Promise((resolve) => {
      this.finnhubService.getConnection().quote(symbol, (erro, data) => {
        resolve(data);
      });
    });
  }
}
