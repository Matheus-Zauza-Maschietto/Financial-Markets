import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  bornDate: Date;
  @Column()
  cpf: string;
  @Column()
  @OneToOne((p) => p.Id)
  wallet: Wallet;
}
