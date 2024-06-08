import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import {Quote} from "./entities/quote.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  providers: [QuoteService],
  exports: [QuoteService]
})
export class QuoteModule {}
