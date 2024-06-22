import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
      ) {}
  
    async signIn(email: string, pass: string): Promise<any> {
      const user = await this.usersService.findOneByEmail(email);
      
      if (!bcrypt.compareSync(pass, user.password)) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
}