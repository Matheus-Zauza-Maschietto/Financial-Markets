import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { Quote } from './entities/quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinnhubService } from '../finnhub/finnhub.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  providers: [QuoteService, FinnhubService],
})
export class QuoteModule {}
