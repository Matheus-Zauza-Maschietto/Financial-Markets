import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import {PersonService} from "../person/person.service";
import {Person} from "../person/entities/person.entity";
import {Wallet} from "../wallet/entities/wallet.entity";
import {WalletService} from "../wallet/wallet.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Person, Wallet])],
  providers: [UserService, PersonService, WalletService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
