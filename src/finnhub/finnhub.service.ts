import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
const finnhub = require('finnhub');

@Injectable()
export class FinnhubService {
    private finnhubClient: any;

    constructor(private configService: ConfigService) {
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        console.log(this.configService.get<string>('STOCK_KEY'));
        api_key.apiKey = this.configService.get<string>('STOCK_KEY');
        this.finnhubClient = new finnhub.DefaultApi();
    }

    getConnection() {
        return this.finnhubClient;
    }
}