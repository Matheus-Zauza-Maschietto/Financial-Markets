import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CalledStock} from "./entities/called-stock.entity";

@Injectable()
export class CalledStockService {
  constructor(
      @InjectRepository(CalledStock)
      private calledStockRepository: Repository<CalledStock>,
  ) {}

  findAll(): Promise<CalledStock[]> {
    return this.calledStockRepository.find();
  }

  findOne(id: number): Promise<CalledStock> {
    return this.calledStockRepository.findOneBy({ id });
  }

  create(calledStock: CalledStock): Promise<CalledStock> {
    return this.calledStockRepository.save(calledStock);
  }

  async remove(id: number): Promise<void> {
    await this.calledStockRepository.delete(id);
  }
}