import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Person, (person) => person.id)
  person: Person;
}
