import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet } from './entities/wallet.entity';
import { Person } from 'src/person/entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Person])],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
