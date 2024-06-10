import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Wallet } from './wallet.entity';
import {User} from "../../user/entities/user.entity";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    iddade: number;

    @Column()
    cpf: string;

    @OneToOne(() => Wallet, wallet => wallet.person)
    wallet: Wallet;

    @OneToOne(() => User, user => user.person)
    @JoinColumn()
    user: User;
}