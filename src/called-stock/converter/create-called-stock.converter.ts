import {CreateCalledStockDto} from "../dto/create-called-stock.dto";
import {CalledStock} from "../entities/called-stock.entity";

export function toCalledStock(calledStockDTO: CreateCalledStockDto): CalledStock {
    const calledStock= new CalledStock();
    calledStock.quantity = calledStockDTO.quantity;
    return calledStock;
}