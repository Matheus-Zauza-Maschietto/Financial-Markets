import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import {Person} from "../../person/entities/person.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true,
    })
    bornDate: Date;

    @OneToOne(() => Person, person => person.id)
    person: Person;
}