import { ApiProperty } from "@nestjs/swagger";

export class ListDtoWithoutEmail {

    @ApiProperty()
    nomeLista: string;

    @ApiProperty()
    dataEntrega: Date;

    @ApiProperty()
    entregue: boolean
}