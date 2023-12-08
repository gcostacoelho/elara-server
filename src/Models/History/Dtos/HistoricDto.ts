import { ApiProperty } from "@nestjs/swagger";

export class HistoricDto {
    @ApiProperty()
    pedido: string;

    @ApiProperty()
    resposta: string;
}