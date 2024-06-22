import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { CalledStock } from 'src/called-stock/entities/called-stock.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  value: number;

  @OneToOne(() => Person, (person) => person.wallet)
  @JoinColumn()
  person: Person;

  @OneToMany(() => CalledStock, (calledStock) => calledStock.wallet)
  @JoinColumn()
  calledStocks: CalledStock[];

  constructor(
    id?: number,
    value?: number,
    person?: Person,
    calledStocks?: CalledStock[],
  ) {
    this.id = id;
    this.value = value;
    this.person = person;
    this.calledStocks = calledStocks;
  }
}
