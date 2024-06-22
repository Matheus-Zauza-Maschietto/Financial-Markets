import { IsOptional, IsString } from 'class-validator';

export class StockSymbolDTO {

    @IsOptional()
    @IsString()
    currency?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    displaySymbol?: string;
}