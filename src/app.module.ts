import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockSymbolModule } from './stock-symbol/stock-symbol.module';
import { QuoteModule } from './quote/quote.module';
import { FinnhubModule } from './finnhub/finnhub.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      //host: 'sql-server',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'Senha123!',
      database: 'master',
      synchronize: true,
      logging: true,
    }),
    StockSymbolModule,
    QuoteModule,
    FinnhubModule,
    UsersModule,
    PersonModule,
    WalletModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
