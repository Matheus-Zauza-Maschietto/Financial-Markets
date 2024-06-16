import {IsOptional, IsString} from "class-validator";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StockSymbol {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        nullable: true
    })
    @IsString()
    @IsOptional()
    currency: string;

    @Column({
        nullable: true
    })
    @IsString()
    @IsOptional()
    description: string;

    @Column({
        nullable: true
    })
    @IsString()
    displaySymbol: string;

    @Column({
        nullable: true
    })
    @IsString()
    @IsOptional()
    figi: string;

    @Column({
        nullable: true
    })
    @IsOptional()
    @IsString()
    isin?: string;

    @Column({
        nullable: true
    })
    @IsString()
    @IsOptional()
    mic: string;

    @Column({
        nullable: true
    })
    @IsString()
    @IsOptional()
    shareClassFIGI: string;

    @Column()
    @IsString()
    symbol: string;

    @Column({
        nullable: true
    })
    @IsOptional()
    @IsString()
    symbol2: string;

    @Column({
        nullable: true
    })
    @IsString()
    @IsOptional()
    type: string;
}
