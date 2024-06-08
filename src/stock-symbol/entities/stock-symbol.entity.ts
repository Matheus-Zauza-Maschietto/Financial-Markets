import {IsOptional, IsString} from "class-validator";

export class StockSymbol {
    @IsString()
    currency: string;

    @IsString()
    description: string;

    @IsString()
    displaySymbol: string;

    @IsString()
    figi: string;

    @IsOptional()
    @IsString()
    isin?: string;

    @IsString()
    mic: string;

    @IsString()
    shareClassFIGI: string;

    @IsString()
    symbol: string;

    @IsOptional()
    @IsString()
    symbol2: string;

    @IsString()
    type: string;
}
