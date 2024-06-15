import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  bornDate: Date;

  @Column({ unique: true })
  cpf: string;

  @OneToOne(() => Wallet, (wallet) => wallet.person)
  wallet: Wallet;

  @OneToOne(() => User, (user) => user.person)
  @JoinColumn()
  user: User;
}
