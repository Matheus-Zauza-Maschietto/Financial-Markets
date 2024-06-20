import {StockSymbol} from "../entities/stock-symbol.entity";
import {StockSymbolDTO} from "../dto/stock-symbol-res.dto";

export function toStockSymbolDTO(stockSymbol: StockSymbol): StockSymbolDTO {
    const dto = new StockSymbolDTO();
    dto.currency = stockSymbol.currency;
    dto.description = stockSymbol.description;
    dto.displaySymbol = stockSymbol.displaySymbol;
    return dto;
}