import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: true })
  ip: string;
  @Column({ nullable: true })
  endpoint: string;
  @Column({ nullable: true })
  method: string;
  @Column({ nullable: true })
  time: number;
}
