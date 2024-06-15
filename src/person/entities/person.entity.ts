import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Wallet} from "../../wallet/entities/wallet.entity";
import {User} from "../../user/entities/user.entity";
import {IsOptional, IsString, MaxLength, MinLength} from "class-validator";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  bornDate: Date;

  @Column()
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  cpf: string;

  @OneToOne(() => Wallet, wallet => wallet.person)
  wallet: Wallet;

  @OneToOne(() => User, user => user.person)
  @JoinColumn()
  user: User;
}