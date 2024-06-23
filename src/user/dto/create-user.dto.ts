import {IsDate, IsEmail, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength} from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  bornDate: Date;

  @IsString()
  @MaxLength(11)
  @MinLength(11)
  cpf: string;
}
