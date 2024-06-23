import {CalledStockService} from "./called-stock.service";
import {CreateCalledStockDto} from "./dto/create-called-stock.dto";
import {toCalledStock} from "./converter/create-called-stock.converter";
import {ViewCalledStockDto} from "./dto/view-called-stock.dto";
import {toViewCalledStockDto} from "./converter/view-called-stock.converter";
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, Headers,
    HttpException,
    HttpStatus, Inject,
    Param,
    Post,
    Query
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {WalletService} from "../wallet/wallet.service";

@Controller('calledstocks')
export class CalledStockController {
    constructor(private readonly calledStockService: CalledStockService,
                private readonly jwtService: JwtService,
                @Inject(WalletService) private walletService: WalletService) {
    }

    @Get()
    async findAll(): Promise<ViewCalledStockDto[]> {
        try {
            return (await this.calledStockService.findAll()).map(c => toViewCalledStockDto(c));
        } catch (e) {
            throw new HttpException('Erro ao consultar as ações compradas.', HttpStatus
                .INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/between/date')
    async findBetweenDates(@Query("startDate") startDate: Date, @Query("endDate") endDate: Date): Promise<ViewCalledStockDto[]> {
        try {
            if (new Date(startDate) > new Date(endDate)) {
                throw new BadRequestException('Data inicial não deve ser menor do que a data final');
            }
            return (await this.calledStockService.findBetweenDates(startDate, endDate))
                .map(c => toViewCalledStockDto(c));
        } catch (e) {
            if (e instanceof BadRequestException) {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Erro ao consultar as ações compradas.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post(':displaySymbol')
    async create(@Param('displaySymbol') symbol: string,
                 @Headers('authorization') payload: string,
                 @Body() calledStock: CreateCalledStockDto): Promise<ViewCalledStockDto> {
        const token = payload.split(' ')[1];
        const decoded = this.jwtService.decode(token) as { sub: number };
        const userId = decoded.sub;
        try {
            const walletId: number = await this.walletService.findWalletIdByUserId(userId);
            return toViewCalledStockDto(await this.calledStockService.create(toCalledStock(calledStock), walletId, symbol));
        } catch (e) {
            throw new HttpException('Erro ao comprar uma ação. Pode ser conexão com API ou informações erradas.',
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    sellById(@Param('id') id: number) {
        try {
            this.calledStockService.sellById(id);
        } catch (e) {
            throw new HttpException('Deu erro ao vender tua ação. Cuidado para não perder dinheiro com isso',
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}