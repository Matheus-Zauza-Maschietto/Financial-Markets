import {CalledStock} from "../entities/called-stock.entity";
import {ViewCalledStockDto} from "../dto/view-called-stock.dto";

export function toViewCalledStockDto(calledStock: CalledStock): ViewCalledStockDto {
    const viewCalledStockDto: ViewCalledStockDto = new ViewCalledStockDto();
    viewCalledStockDto.calledDate = calledStock.calledDate;
    viewCalledStockDto.wallet = calledStock.wallet.id;
    viewCalledStockDto.stockSymbol = calledStock.stockSymbol.id;
    viewCalledStockDto.quantity = calledStock.quantity;
    viewCalledStockDto.buyPrice = calledStock.buyPrice;
    viewCalledStockDto.sellPrice = calledStock.sellPrice;
    return viewCalledStockDto;
}