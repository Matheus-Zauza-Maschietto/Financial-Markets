import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  @IsString()
  @IsStrongPassword()
  password: string;
  @OneToOne(() => Person, (person) => person.id)
  @JoinColumn()
  person: Person;
}
