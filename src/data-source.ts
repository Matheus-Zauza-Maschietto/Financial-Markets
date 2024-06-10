import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entities';
import { StockSymbol } from './stock-symbol/entities/stock-symbol.entity';
import { Quote } from './quote/entities/quote.entity';

export const AppDataSource = new DataSource({
  type: 'mssql',
  //host: 'sql-server',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'Senha123!',
  database: 'master',
  synchronize: true,
  logging: true,
  entities: [User, StockSymbol, Quote],
  subscribers: [],
  migrations: [],
  extra: {
    autoLoadEntities: true,
    trustServerCertificate: true,
  },
});
