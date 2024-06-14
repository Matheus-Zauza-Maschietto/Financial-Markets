import { Person } from 'src/person/entities/person.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from 'class-validator';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  value: number;

  @OneToOne(() => Person, (person) => person.id)
  person: Person;
}
