import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PersonService} from './person.service';
import {PersonController} from './person.controller';
import {Person} from './entities/person.entity';
import {WalletService} from "../wallet/wallet.service";
import {Wallet} from "../wallet/entities/wallet.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Person, Wallet])],
  providers: [PersonService, WalletService],
  controllers: [PersonController],
})
export class PersonModule {}
