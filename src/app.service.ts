import {Injectable} from '@nestjs/common';
import {FinnhubService} from "./finnhub/finnhub.service";
import {QuoteService} from "./quote/quote.service";

@Injectable()
export class AppService {

  constructor() {}
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
