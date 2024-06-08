import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockSymbolModule } from './stock-symbol/stock-symbol.module';
import { QuoteModule } from './quote/quote.module';
import { FinnhubModule } from './finnhub/finnhub.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'acoes',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    StockSymbolModule, QuoteModule, FinnhubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
