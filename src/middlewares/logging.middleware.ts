import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { CreateLogDto } from 'src/log/dto/create-log.dto';
import { Log } from 'src/log/entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly _logRepository: Repository<Log>;
  constructor(@InjectRepository(Log) logRepository: Repository<Log>) {
    this._logRepository = logRepository;
  }

  async create(createLogDto: CreateLogDto): Promise<void> {
    const logDto: CreateLogDto = {
      ip: createLogDto.ip,
      endpoint: createLogDto.endpoint,
      method: createLogDto.method,
      time: createLogDto.time,
    };

    console.log(logDto);

    await this._logRepository.save(logDto);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const dateStart = Date.now();
    res.on('finish', async () => {
      const dateEnd = Date.now();
      await this.create({
        endpoint: req.url,
        ip: req.ip,
        method: req.method,
        time: dateEnd - dateStart,
      });
      console.log(`
        Request for: ${req.url} with method: ${req.method}. Request time: ${dateEnd - dateStart}`);
    });
    next();
  }
}
