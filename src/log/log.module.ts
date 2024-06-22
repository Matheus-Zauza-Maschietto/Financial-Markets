import { Module } from '@nestjs/common';
import { Log } from './entities/log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([Log])],
  exports: [TypeOrmModule],
})
export class LogModule {}
