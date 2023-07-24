import { ApiProperty } from "@nestjs/swagger";

export class UserDtoPass {

    @ApiProperty()
    nome: string;

    @ApiProperty()
    email: string

    @ApiProperty()
    dataNascimento: Date

    @ApiProperty()
    senha: string
}