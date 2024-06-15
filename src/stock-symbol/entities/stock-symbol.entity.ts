import {IsOptional, IsString} from "class-validator";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StockSymbol {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @IsString()
    currency: string;

    @Column()
    @IsString()
    description: string;

    @Column()
    @IsString()
    displaySymbol: string;

    @Column()
    @IsString()
    figi: string;

    @Column()
    @IsOptional()
    @IsString()
    isin?: string;

    @Column()
    @IsString()
    mic: string;

    @Column()
    @IsString()
    shareClassFIGI: string;

    @Column()
    @IsString()
    symbol: string;

    @Column()
    @IsOptional()
    @IsString()
    symbol2: string;

    @Column()
    @IsString()
    type: string;
}
