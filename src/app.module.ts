import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockSymbolModule } from './stock-symbol/stock-symbol.module';
import { QuoteModule } from './quote/quote.module';
import { FinnhubModule } from './finnhub/finnhub.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { PersonModule } from './person/person.module';
import { WalletModule } from './wallet/wallet.module';
import { CalledStockModule } from './called-stock/called-stock.module';
import {UserModule} from "./user/user.module";
import {UserService} from "./user/user.service";
import {Wallet} from "./wallet/entities/wallet.entity";
import {Person} from "./person/entities/person.entity";
import {User} from "./user/entities/user.entity";
import {StockSymbol} from "./stock-symbol/entities/stock-symbol.entity";
import {CalledStock} from "./called-stock/entities/called-stock.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      // host: 'sql-server',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'Senha123!',
      database: 'master',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      entities: [Wallet, Person, User, CalledStock, StockSymbol],
      options: {trustServerCertificate: true}
    }),
    StockSymbolModule,
    QuoteModule,
    FinnhubModule,
    UserModule,
    PersonModule,
    WalletModule,
    CalledStockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
