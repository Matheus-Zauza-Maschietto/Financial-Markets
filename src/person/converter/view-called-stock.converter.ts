import {Person} from "../entities/person.entity";
import {ViewPersonDto} from "../dto/view-person.dto";


export function toViewPersonDto(person: Person): ViewPersonDto {
    const viewPersonDto: ViewPersonDto = new ViewPersonDto();
    viewPersonDto.name = person.name;
    viewPersonDto.wallet = person.wallet?.id;
    viewPersonDto.cpf= person.cpf;
    viewPersonDto.bornDate = person.bornDate;
    return viewPersonDto;
}