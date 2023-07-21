import { ApiProperty } from "@nestjs/swagger";
import { User } from "../User";

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