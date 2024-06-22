import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogService {
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

    this._logRepository.save(logDto);
  }
}
