import { Test, TestingModule } from '@nestjs/testing';
import { StockSymbolService } from './stock-symbol.service';

describe('StockSymbolService', () => {
  let service: StockSymbolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockSymbolService],
    }).compile();

    service = module.get<StockSymbolService>(StockSymbolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
