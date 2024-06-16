import {Injectable} from '@nestjs/common';
import {FinnhubService} from "./finnhub/finnhub.service";
import {QuoteService} from "./quote/quote.service";

@Injectable()
export class AppService {

  constructor() {}
  async getHello(): Promise<string> {
    // this.finnhubService.getConnection().quote("AAPL", (error, data, response) => {
    //   console.log(data)
    //   this.quoteService.create(data);
    // });
    // console.log(await this.quoteService.findAll());
    return 'Hello World!';
  }
}
