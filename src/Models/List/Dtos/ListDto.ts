import { ApiProperty } from "@nestjs/swagger";
import { List } from "../List";

export class ListDto {

    @ApiProperty()
    emailUsuario: string;

    @ApiProperty()
    nomeLista: string;

    @ApiProperty()
    dataEntrega: Date;
}