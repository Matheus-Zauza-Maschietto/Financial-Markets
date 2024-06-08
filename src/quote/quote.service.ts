import {Injectable} from '@nestjs/common';
import {Quote} from "./entities/quote.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class QuoteService {
  constructor(@InjectRepository(Quote)private quoteRepository: Repository<Quote>,
  ) {}

  create(createQuote: Quote) {
    this.quoteRepository.save(createQuote);
  }

  findAll(): Promise<Quote[]> {
    return this.quoteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} quote`;
  }

  update(id: number, updateQuote: Quote) {
    return `This action updates a #${id} quote`;
  }

  remove(id: number) {
    return `This action removes a #${id} quote`;
  }
}
