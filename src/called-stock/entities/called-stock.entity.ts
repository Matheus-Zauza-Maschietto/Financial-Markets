import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {StockSymbol} from "../../stock-symbol/entities/stock-symbol.entity";
import {Wallet} from "../../wallet/entities/wallet.entity";
import {IsDate, IsNumber, IsOptional, Min} from "class-validator";


@Entity()
export class CalledStock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StockSymbol, stockSymbol => stockSymbol.id)
    stockSymbol: StockSymbol;

    @ManyToOne(() => Wallet, wallet => wallet.id)
    wallet: Wallet;

    @Column()
    @IsNumber()
    @Min(1)
    quantity: number;

    @Column()
    @IsDate()
    calledDate: Date;

    @Column()
    @IsNumber()
    buyPrice: number;

    @Column()
    @IsNumber()
    @IsOptional()
    sellPrice: number;
}