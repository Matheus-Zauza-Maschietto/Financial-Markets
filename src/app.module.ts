import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockSymbolModule } from './stock-symbol/stock-symbol.module';
import { QuoteModule } from './quote/quote.module';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { WalletModule } from './wallet/wallet.module';
import { CalledStockModule } from './called-stock/called-stock.module';
import { UserModule } from './user/user.module';
import { Wallet } from './wallet/entities/wallet.entity';
import { Person } from './person/entities/person.entity';
import { User } from './user/entities/user.entity';
import { StockSymbol } from './stock-symbol/entities/stock-symbol.entity';
import { CalledStock } from './called-stock/entities/called-stock.entity';
import { LoggerMiddleware } from './middlewares/logging.middleware';

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
      options: { trustServerCertificate: true },
    }),
    StockSymbolModule,
    QuoteModule,
    UserModule,
    PersonModule,
    WalletModule,
    CalledStockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
