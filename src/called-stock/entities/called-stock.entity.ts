import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {StockSymbol} from "../../stock-symbol/entities/stock-symbol.entity";
import {Wallet} from "../../wallet/entities/wallet.entity";
import {IsDate, IsNumber, IsOptional, Min} from "class-validator";


@Entity()
export class CalledStock {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => StockSymbol, stockSymbol => stockSymbol.id)
    @JoinColumn()
    stockSymbol: StockSymbol;

    @ManyToOne(() => Wallet, wallet => wallet.id)
    @JoinColumn()
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

    @Column({
        nullable: true
    })
    @IsNumber()
    @IsOptional()
    sellPrice: number;
}