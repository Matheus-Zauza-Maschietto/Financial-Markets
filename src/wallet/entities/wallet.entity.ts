import { Person } from 'src/person/entities/person.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  value: number;
  @Column()
  @OneToOne((p) => p.Id)
  person: Person;
}
