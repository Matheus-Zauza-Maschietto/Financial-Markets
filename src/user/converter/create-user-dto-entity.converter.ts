import {CreateUserDto} from "../dto/create-user.dto";
import {User} from "../entities/user.entity";
import {Person} from "../../person/entities/person.entity";


export function fromCreateUsertoUser(dto: CreateUserDto): User {
    const entity: User = new User();

    entity.person = new Person();

    entity.email = dto.email;
    entity.password = dto.password;
    entity.person.name = dto.name;
    entity.person.cpf= dto.cpf;
    entity.person.bornDate = dto.bornDate;
    return entity;
}