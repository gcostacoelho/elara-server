import { ApiProperty } from "@nestjs/swagger";

export class UserDtoWithoutPass {

    @ApiProperty()
    nome: string;

    @ApiProperty()
    email: string

    @ApiProperty()
    dataNascimento: Date
}