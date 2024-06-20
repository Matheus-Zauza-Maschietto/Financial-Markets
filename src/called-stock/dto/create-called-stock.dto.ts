import {IsNumber} from "class-validator";

export class CreateCalledStockDto {

    @IsNumber()
    quantity: number;
}
