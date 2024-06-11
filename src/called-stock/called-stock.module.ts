import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CalledStock} from "./entities/called-stock.entity";
import {CalledStockService} from "./called-stock.service";
import {CalledStockController} from "./called-stock.controller";


@Module({
  imports: [TypeOrmModule.forFeature([CalledStock])],
  providers: [CalledStockService],
  controllers: [CalledStockController],
})
export class CalledStockModule {}