import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import finnhub from 'finnhub';

@Injectable()
export class FinnhubService {
  private finnhubClient: any;

  constructor(private configService: ConfigService) {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = this.configService.get<string>('STOCK_KEY');
    this.finnhubClient = new finnhub.DefaultApi();
  }

  getConnection() {
    return this.finnhubClient;
  }
}
