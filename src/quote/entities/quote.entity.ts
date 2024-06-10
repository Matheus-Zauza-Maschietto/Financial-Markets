import { IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsNumber()
  c: number;

  @Column()
  @IsNumber()
  d: number;

  @Column()
  @IsNumber()
  dp: number;

  @Column()
  @IsNumber()
  h: number;

  @Column()
  @IsNumber()
  l: number;

  @Column()
  @IsNumber()
  o: number;

  @Column()
  @IsNumber()
  pc: number;

  @Column(IsOptional)
  @IsNumber()
  t: number;
}
