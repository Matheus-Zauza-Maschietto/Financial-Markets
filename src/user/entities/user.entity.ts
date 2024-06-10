import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import {Person} from "../../person/entities/person.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @OneToOne(() => Person, person => person.user)
    person: Person;
}