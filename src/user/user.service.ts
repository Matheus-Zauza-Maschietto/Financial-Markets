import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "./entities/user.entity";
import { error } from 'console';
import { promises } from 'dns';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } }); 
  }

  async create(user: User): Promise<User> {
    await this.crypt(user);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async crypt(user: User): Promise<void> {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    

    user.password = await new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          throw new Error(err);
        }

        return bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {

          if (err) {
            throw new Error(err);
          }
          resolve(hash);
        });
      })
    });
  }
  
}

