import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  public email: string;
  public name: string;
  public bornDate: Date;
  public cpf: string;
}
